import shutil
import os

# Source directory (Brain/Artifacts)
src_dir = r"C:\Users\Ozan\.gemini\antigravity\brain\77361257-25f5-4404-8c75-2f9f7072e081"
# Destination directory (Playground)
dst_dir = r"c:\Users\Ozan\.gemini\antigravity\playground\exo-corona\assets\images"

# Mapping: Artifact Filename -> Logical Filename
moves = [
    ("cyber_security_legal_breach_notification_1768248201977.png", "scenario2_stage5.png"),
    ("cyber_security_future_soc_1768248228120.png",              "scenario2_stage6.png"),
    ("cyber_security_training_gamified_1768248253866.png",        "scenario3_stage5.png"),
    ("cyber_security_server_gateway_1768248273934.png",           "scenario3_stage6.png"),
    ("cyber_security_dlp_alert_1768248294011.png",                "scenario4_stage5.png"),
    ("cyber_security_policy_meeting_1768248312483.png",           "scenario4_stage6.png"),
    ("cyber_security_endpoint_scan_1768248331438.png",            "scenario9_stage5.png"),
    ("cyber_security_geo_blocking_1768248349603.png",             "scenario9_stage6.png")
]

print(f"Moving images from {src_dir} to {dst_dir}")

for src_name, dst_name in moves:
    src_path = os.path.join(src_dir, src_name)
    dst_path = os.path.join(dst_dir, dst_name)
    
    try:
        if os.path.exists(src_path):
            shutil.move(src_path, dst_path)
            print(f"[OK] Moved {src_name} -> {dst_name}")
        else:
            print(f"[ERR] Source not found: {src_path}")
    except Exception as e:
        print(f"[ERR] Failed to move {src_name}: {e}")
