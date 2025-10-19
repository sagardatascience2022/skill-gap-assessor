import streamlit as st

st.set_page_config(page_title="Skill Gap Assessor", layout="centered")

st.title("Skill Gap Assessor Demo (Streamlit)")

assessment_data = [
    {"id": 1, "question": "Which library is foundational for numerical operations in Python?", "answer": "NumPy"},
    {"id": 2, "question": "What is the primary function of Pandas?", "answer": "Data Manipulation"},
    {"id": 3, "question": "Which methodology focuses on iterative development?", "answer": "Agile"},
    {"id": 4, "question": "What version control system is industry standard?", "answer": "Git"},
    {"id": 5, "question": "What is the JS library for building UIs?", "answer": "React.js"},
]

def normalize(text: str) -> str:
    import re
    if not text:
        return ""
    t = text.strip()
    t = re.sub(r"[.,/#!$%^&*;:{}=\-_`~()]+", "", t)
    t = re.sub(r"\s+", " ", t)
    return t.lower()

with st.form(key='assessment_form'):
    st.write("Please answer the following questions:")
    responses = {}
    for item in assessment_data:
        responses[item['id']] = st.text_input(f"{item['id']}. {item['question']}", key=f"q_{item['id']}")

    submitted = st.form_submit_button("Submit Assessment")
    if submitted:
        correct_count = 0
        for item in assessment_data:
            user = normalize(responses[item['id']])
            correct = normalize(item['answer'])
            if user == correct:
                correct_count += 1

        st.success(f"Score: {correct_count} / {len(assessment_data)}")
        if correct_count < len(assessment_data) * 0.6:
            st.info("Review needed! This highlights areas for improvement.")
        else:
            st.info("Great job! Strong foundational knowledge demonstrated.")
