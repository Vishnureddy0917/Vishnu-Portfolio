import os
import glob
import subprocess
import wave
import imageio_ffmpeg
import cv2
import numpy as np

def main():
    print("=== Hero Assets Build Pipeline ===")
    
    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
    os.makedirs('public/hero', exist_ok=True)
    os.makedirs('public/logos', exist_ok=True)
    
    # Copy resume to public/resume.pdf
    pdf_files = glob.glob('*.pdf')
    if pdf_files:
        import shutil
        shutil.copy(pdf_files[0], 'public/resume.pdf')
        print(f"Copied {pdf_files[0]} -> public/resume.pdf")

    video_files = glob.glob('*.mp4')
    input_video = [f for f in video_files if 'hero' not in f and 'temp' not in f][0]
    print(f"Source video: {input_video}")

    # Extract confident video pose (frame 60 at 2.5s) for portrait-bust.webp
    cap_init = cv2.VideoCapture(input_video)
    cap_init.set(cv2.CAP_PROP_POS_FRAMES, 60)
    ret_f60, frame_pose = cap_init.read()
    if ret_f60:
        # Head to chest crop: y from 20 to 520, x from 720 to 1140
        bust = frame_pose[20:520, 720:1140]
        bust_resized = cv2.resize(bust, (480, 600), interpolation=cv2.INTER_AREA)
        cv2.imwrite('public/portrait-bust.webp', bust_resized)
        print("Generated public/portrait-bust.webp from confident frame pose (2.5s)!")
    cap_init.release()

    # Pure whitening filter: rimax=0.92:gimax=0.92:bimax=0.92 forces light backdrop to pure #ffffff
    temp_v = 'temp_whitened.mp4'
    cmd_prep = [
        ffmpeg_exe, '-y', '-i', input_video,
        '-vf', 'crop=800:1080:534:0,scale=768:1036,colorlevels=rimax=0.92:gimax=0.92:bimax=0.92,fps=24',
        '-c:v', 'libx264', '-crf', '18', '-pix_fmt', 'yuv420p',
        '-c:a', 'aac', '-b:a', '128k', temp_v
    ]
    subprocess.run(cmd_prep, check=True)

    # Frame-accurate Video Loop Crossfade in NumPy / OpenCV
    cap = cv2.VideoCapture(temp_v)
    fps = int(cap.get(cv2.CAP_PROP_FPS)) or 24
    frames = []
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        frames.append(frame)
    cap.release()

    fade_frames = int(0.5 * fps)
    total_frames = len(frames)
    loop_frames = total_frames - fade_frames

    out_video_frames = []
    for i in range(loop_frames):
        if i < fade_frames:
            alpha = i / float(fade_frames)
            f_head = frames[i].astype(np.float32)
            f_tail = frames[total_frames - fade_frames + i].astype(np.float32)
            blended = (f_tail * (1.0 - alpha) + f_head * alpha).astype(np.uint8)
            out_video_frames.append(blended)
        else:
            out_video_frames.append(frames[i])

    temp_loop_raw = 'temp_loop_raw.mp4'
    height, width, _ = out_video_frames[0].shape
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out_writer = cv2.VideoWriter(temp_loop_raw, fourcc, fps, (width, height))
    for f in out_video_frames:
        out_writer.write(f)
    out_writer.release()

    # Audio Loop Crossfade
    temp_audio_in = 'temp_audio.wav'
    subprocess.run([ffmpeg_exe, '-y', '-i', temp_v, '-vn', '-ac', '2', '-ar', '44100', temp_audio_in], check=True)

    with wave.open(temp_audio_in, 'rb') as wf:
        nchannels = wf.getnchannels()
        sampwidth = wf.getsampwidth()
        framerate = wf.getframerate()
        nframes = wf.getnframes()
        audio_bytes = wf.readframes(nframes)

    audio_data = np.frombuffer(audio_bytes, dtype=np.int16).reshape(-1, nchannels)
    fade_samples = int(0.5 * framerate)
    total_samples = audio_data.shape[0]

    loop_samples = int((loop_frames / float(fps)) * framerate)
    head_audio = audio_data[:loop_samples].copy().astype(np.float32)
    tail_audio = audio_data[total_samples - fade_samples:].copy().astype(np.float32)

    alpha_a = np.linspace(0, 1, fade_samples)[:, np.newaxis]
    head_audio[:fade_samples] = tail_audio[:fade_samples] * (1.0 - alpha_a) + head_audio[:fade_samples] * alpha_a
    audio_out_data = np.clip(head_audio, -32768, 32767).astype(np.int16)

    temp_audio_out = 'temp_audio_loop.wav'
    with wave.open(temp_audio_out, 'wb') as wf:
        wf.setnchannels(nchannels)
        wf.setsampwidth(sampwidth)
        wf.setframerate(framerate)
        wf.writeframes(audio_out_data.tobytes())

    print("Encoding public/hero/hero.mp4...")
    cmd_mp4 = [
        ffmpeg_exe, '-y', '-i', temp_loop_raw, '-i', temp_audio_out,
        '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '24', '-preset', 'slow',
        '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart', '-shortest',
        'public/hero/hero.mp4'
    ]
    subprocess.run(cmd_mp4, check=True)

    print("Encoding public/hero/hero.webm...")
    cmd_webm = [
        ffmpeg_exe, '-y', '-i', temp_loop_raw, '-i', temp_audio_out,
        '-c:v', 'libvpx-vp9', '-crf', '36', '-b:v', '0',
        '-c:a', 'libopus', '-b:a', '80k', '-shortest',
        'public/hero/hero.webm'
    ]
    subprocess.run(cmd_webm, check=True)

    # Generate og.jpg (1200x630)
    og_img = np.full((630, 1200, 3), (238, 242, 244), dtype=np.uint8)
    cv2.putText(og_img, 'YENIMIREDDY VISHNU REDDY', (80, 260), cv2.FONT_HERSHEY_SIMPLEX, 1.6, (13, 13, 13), 4, cv2.LINE_AA)
    cv2.putText(og_img, 'Full Stack Developer & AI/ML Engineer', (80, 340), cv2.FONT_HERSHEY_SIMPLEX, 1.1, (119, 117, 111), 2, cv2.LINE_AA)
    cv2.imwrite('public/og.jpg', og_img)
    print("Generated public/og.jpg")

    for t in [temp_v, temp_loop_raw, temp_audio_in, temp_audio_out]:
        if os.path.exists(t):
            os.remove(t)

    print("=== Hero Pipeline Finished Successfully! ===")

if __name__ == '__main__':
    main()
