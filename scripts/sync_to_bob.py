import sqlite3
import json
import uuid
import time
from datetime import datetime

TRANSCRIPT_PATH = '/home/nethunter/.gemini/antigravity-cli/brain/4f4fc1f8-575b-4959-9ea6-a9d2d4b88496/.system_generated/logs/transcript.jsonl'
DB_PATH = '/home/nethunter/.bob/db/bob.db'

def extract_turns():
    turns = []
    current_user = None

    with open(TRANSCRIPT_PATH, 'r', encoding='utf-8') as f:
        for line in f:
            if not line.strip():
                continue
            entry = json.loads(line)
            t = entry.get('type')
            content = entry.get('content', '')
            created_at_str = entry.get('created_at', '')

            # Parse created_at to epoch milliseconds
            try:
                dt = datetime.fromisoformat(created_at_str.replace('Z', '+00:00'))
                epoch_ms = int(dt.timestamp() * 1000)
            except Exception:
                epoch_ms = int(time.time() * 1000)

            if t == 'USER_INPUT':
                if '<USER_REQUEST>' in content:
                    user_text = content.split('<USER_REQUEST>')[1].split('</USER_REQUEST>')[0].strip()
                else:
                    user_text = content.strip()
                current_user = {'text': user_text, 'timestamp': epoch_ms}
            elif t == 'PLANNER_RESPONSE' and content and current_user:
                turns.append({
                    'user': current_user,
                    'assistant': {
                        'text': content.strip(),
                        'timestamp': epoch_ms
                    }
                })
                current_user = None

    return turns

def sync_to_bob_db(turns):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    title = "Problem Statement No. 7: Research Agent Studio"
    first_msg = turns[0]['user']['text'] if turns else "Research Agent Development"
    now_ms = int(time.time() * 1000)

    # We want to support both project_id = 'file:/home/nethunter/IBM' and 'file:/home/nethunter/IBM/project'
    task_configs = [
        {
            'id': 'b7d8f0f7a6a787745d3d7e0c67e99a3e', # Existing task created today in Bob IDE
            'project_id': 'file:/home/nethunter/IBM',
            'directory': '/home/nethunter/IBM/project',
        },
        {
            'id': 'a7e99a3eb7d8f0f7a6a787745d3d7e0c', # Project-specific task
            'project_id': 'file:/home/nethunter/IBM/project',
            'directory': '/home/nethunter/IBM/project',
        }
    ]

    for tc in task_configs:
        tid = tc['id']
        pid = tc['project_id']
        directory = tc['directory']

        # Upsert task
        c.execute("SELECT id FROM tasks WHERE id = ?", (tid,))
        exists = c.fetchone()

        if exists:
            c.execute("""
                UPDATE tasks
                SET title = ?, first_message = ?, directory = ?, updated_at = ?
                WHERE id = ?
            """, (title, first_msg, directory, now_ms, tid))
        else:
            c.execute("""
                INSERT INTO tasks (
                    id, project_id, title, status, first_message, directory, created_at, updated_at, task_type, is_pinned
                ) VALUES (?, ?, ?, 'active', ?, ?, ?, ?, 'normal', 0)
            """, (tid, pid, title, first_msg, directory, now_ms, now_ms))

        # Delete existing messages for this task to avoid duplicates on re-run
        c.execute("DELETE FROM messages WHERE task_id = ?", (tid,))

        # Insert turns
        for i, turn in enumerate(turns):
            u_msg = turn['user']
            a_msg = turn['assistant']

            u_id = uuid.uuid4().hex
            u_data = json.dumps({
                "id": u_id,
                "role": "user",
                "content": u_msg['text'],
                "_meta": {"timestamp": u_msg['timestamp']}
            }, ensure_ascii=False)

            c.execute("""
                INSERT INTO messages (id, task_id, role, data, created_at)
                VALUES (?, ?, 'user', ?, ?)
            """, (u_id, tid, u_data, u_msg['timestamp']))

            a_id = uuid.uuid4().hex
            a_data = json.dumps({
                "id": a_id,
                "role": "assistant",
                "content": a_msg['text'],
                "_meta": {"timestamp": a_msg['timestamp']}
            }, ensure_ascii=False)

            c.execute("""
                INSERT INTO messages (id, task_id, role, data, created_at)
                VALUES (?, ?, 'assistant', ?, ?)
            """, (a_id, tid, a_data, a_msg['timestamp']))

    conn.commit()
    conn.close()
    print("✓ Successfully synchronized conversation turns to IBM Bob IDE database.")

def export_markdown_history(turns):
    md_content = [
        "# IBM watsonx.ai Research Agent Studio - Full Development Chat History",
        f"*Synchronized for IBM Bob IDE · Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}*\n",
        "---",
    ]

    for i, turn in enumerate(turns, 1):
        u = turn['user']
        a = turn['assistant']

        dt_u = datetime.fromtimestamp(u['timestamp'] / 1000).strftime('%Y-%m-%d %H:%M:%S')
        dt_a = datetime.fromtimestamp(a['timestamp'] / 1000).strftime('%Y-%m-%d %H:%M:%S')

        md_content.append(f"## 👤 Turn {i}: User Request ({dt_u})\n")
        md_content.append(f"> {u['text'].replace(chr(10), chr(10) + '> ')}\n")
        md_content.append(f"## 🤖 Turn {i}: Assistant Response ({dt_a})\n")
        md_content.append(a['text'])
        md_content.append("\n---\n")

    full_md = '\n'.join(md_content)
    with open('/home/nethunter/IBM/project/CHAT_HISTORY.md', 'w', encoding='utf-8') as f:
        f.write(full_md)
    print("✓ Successfully exported CHAT_HISTORY.md in /home/nethunter/IBM/project/CHAT_HISTORY.md")

if __name__ == '__main__':
    turns = extract_turns()
    print(f"Extracted {len(turns)} dialogue turns from session transcript.")
    sync_to_bob_db(turns)
    export_markdown_history(turns)
