
import random
import string
import datetime

def generate_id():
    return 'cm' + ''.join(random.choices(string.ascii_lowercase + string.digits, k=23))

sql_lines = []

# Constants
PASSWORD_HASH = "$2b$10$N3QWGoZvZRj0zl.jUbT8l.a9ZlBjkLncM06L/Tcm2D..aevcZHrf6"
SUBJECTS = ['Mathematics', 'Reasoning', 'General Awareness', 'English']
TOPICS = {
    'Mathematics': ['Percentage', 'Profit & Loss', 'Time & Work', 'Algebra', 'Trigonometry'],
    'Reasoning': ['Series', 'Coding-Decoding', 'Blood Relations', 'Syllogism', 'Analogy'],
    'General Awareness': ['History', 'Geography', 'Polity', 'Science', 'Current Affairs'],
    'English': ['Grammar', 'Vocabulary', 'Comprehension', 'Synonyms', 'Antonyms']
}

# Organizations
org_ids = []
for i in range(1, 11):
    org_id = generate_id()
    org_ids.append(org_id)
    name = f"Organization {i}"
    email = f"contact@org{i}.demo.com"
    plan = random.choice(['FREE', 'STANDARD', 'ENTERPRISE'])
    sql_lines.append(f"INSERT INTO Organization (id, name, contactEmail, plan, status, createdAt, updatedAt) VALUES ('{org_id}', '{name}', '{email}', '{plan}', 'ACTIVE', datetime('now'), datetime('now'));")

# Users
user_data = [] # List of (id, role, org_id)
for i, org_id in enumerate(org_ids, 1):
    # 2 Owners
    for j in range(1, 3):
        u_id = generate_id()
        email = f"owner{j}_org{i}@demo.com"
        name = f"Owner {j} (Org {i})"
        sql_lines.append(f"INSERT INTO User (id, name, email, password, role, organizationId, createdAt) VALUES ('{u_id}', '{name}', '{email}', '{PASSWORD_HASH}', 'ORG_OWNER', '{org_id}', datetime('now'));")
        user_data.append((u_id, 'ORG_OWNER', org_id))
    
    # 3 Teachers
    org_teachers = []
    for j in range(1, 4):
        u_id = generate_id()
        email = f"teacher{j}_org{i}@demo.com"
        name = f"Teacher {j} (Org {i})"
        sql_lines.append(f"INSERT INTO User (id, name, email, password, role, organizationId, createdAt) VALUES ('{u_id}', '{name}', '{email}', '{PASSWORD_HASH}', 'TEACHER', '{org_id}', datetime('now'));")
        user_data.append((u_id, 'TEACHER', org_id))
        org_teachers.append(u_id)
    
    # 2 Students
    org_students = []
    for j in range(1, 3):
        u_id = generate_id()
        email = f"student{j}_org{i}@demo.com"
        name = f"Student {j} (Org {i})"
        sql_lines.append(f"INSERT INTO User (id, name, email, password, role, organizationId, createdAt) VALUES ('{u_id}', '{name}', '{email}', '{PASSWORD_HASH}', 'USER', '{org_id}', datetime('now'));")
        user_data.append((u_id, 'USER', org_id))
        org_students.append(u_id)

    # 20 Questions per Org
    org_questions = []
    for k in range(1, 21):
        q_id = generate_id()
        subject = random.choice(SUBJECTS)
        topic = random.choice(TOPICS[subject])
        teacher_id = random.choice(org_teachers)
        text = f"Question {k} for Org {i}: What is {k} + {i}?"
        options = '[{"text":"' + str(k+i) + '"},{"text":"' + str(k+i+1) + '"},{"text":"' + str(k+i-1) + '"},{"text":"' + str(k+i+2) + '"}]'
        sql_lines.append(f"INSERT INTO Question (id, text, options, correctOptionIndex, subject, topic, difficulty, examType, organizationId, createdById, isPublic, category, createdAt, updatedAt) VALUES ('{q_id}', '{text}', '{options}', 0, '{subject}', '{topic}', 'MEDIUM', 'SSC_CGL', '{org_id}', '{teacher_id}', 0, 'BOTH', datetime('now'), datetime('now'));")
        org_questions.append(q_id)
    
    # 2 Tests per Org
    for t in range(1, 3):
        test_id = generate_id()
        teacher_id = random.choice(org_teachers)
        title = f"Mock Test {t} - Org {i}"
        desc = f"Comprehensive mock test for Org {i}"
        num_q = 10
        sql_lines.append(f"INSERT INTO Test (id, title, description, type, duration, questionCount, difficulty, totalMarks, negativeMarking, organizationId, createdById, status, isPublic, createdAt, updatedAt) VALUES ('{test_id}', '{title}', '{desc}', 'Full', 30, {num_q}, 'MEDIUM', 20.0, 0.5, '{org_id}', '{teacher_id}', 'LIVE', 0, datetime('now'), datetime('now'));")
        
        # Link questions to test (_TestQuestions table)
        test_qs = random.sample(org_questions, num_q)
        for q_id in test_qs:
            sql_lines.append(f"INSERT INTO _TestQuestions (A, B) VALUES ('{test_id}', '{q_id}');")
        
        # Assignments and Attempts
        for s_id in org_students:
            sql_lines.append(f"INSERT INTO TestAssignment (id, testId, studentId, organizationId, assignedAt) VALUES ('{generate_id()}', '{test_id}', '{s_id}', '{org_id}', datetime('now'));")
            
            if random.random() > 0.4:
                score = random.uniform(5, 20)
                acc = (score / 20.0) * 100
                sql_lines.append(f"INSERT INTO UserTestAttempt (id, userId, testId, score, accuracy, answersJson, status, organizationId, startedAt, updatedAt, completedAt) VALUES ('{generate_id()}', '{s_id}', '{test_id}', {score}, {acc}, '{{}}', 'SUBMITTED', '{org_id}', datetime('now'), datetime('now'), datetime('now'));")

with open('populate_data.sql', 'w') as f:
    f.write('\n'.join(sql_lines))

print("SQL file generated successfully.")
