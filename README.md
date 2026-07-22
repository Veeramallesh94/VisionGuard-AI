#  VisionGuard AI – Intelligent Diabetic Retinopathy Detection Platform

![Python](https://img.shields.io/badge/Python-3.10-blue)
![React](https://img.shields.io/badge/React.js-Frontend-61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688)
![PyTorch](https://img.shields.io/badge/PyTorch-DeepLearning-red)
![OpenCV](https://img.shields.io/badge/OpenCV-Computer_Vision-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

An AI-powered healthcare platform that detects **Diabetic Retinopathy** from retinal fundus images using **Computer Vision** and **Deep Learning**, helping enable faster and earlier eye disease screening.

---

#  Live Demo

https://vision-guard-ai-jade.vercel.app/

---

#  GitHub Repository

https://github.com/Veeramallesh94/VisionGuard-AI

---

#  Project Overview

VisionGuard AI is a full-stack AI application that analyzes retinal fundus images and predicts the severity of **Diabetic Retinopathy (DR)**. The platform provides a simple interface for uploading retinal images and displays the prediction with confidence score and disease severity.

---

#  Key Features

- 🖼 Upload retinal fundus images
- 🤖 AI-powered disease prediction
- 📊 5-stage Diabetic Retinopathy classification
- 📈 Confidence score visualization
- 🧾 Patient prediction history
- ⚡ FastAPI REST APIs
- 💻 Responsive React.js interface

---

#  Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios

### Backend
- FastAPI
- Python
- Uvicorn

### AI & Computer Vision
- PyTorch
- EfficientNet-B4
- OpenCV

---

#  Project Structure

```text
VisionGuard-AI/
├── frontend/
├── backend/
├── model/
├── utils/
├── README.md
└── docker-compose.yml
```

---

#  Installation

```bash
git clone https://github.com/Veeramallesh94/VisionGuard-AI.git

cd VisionGuard-AI

# Backend
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload

# Frontend
cd ../frontend
npm install
npm run dev
```

---

#  Prediction Classes

| Grade | Severity |
|-------|----------|
| 0 | No DR |
| 1 | Mild |
| 2 | Moderate |
| 3 | Severe |
| 4 | Proliferative DR |

---

#  Project Objective

To develop an AI-assisted screening system that supports early detection of Diabetic Retinopathy, helping healthcare professionals identify patients who require timely medical attention.

---

#  Future Enhancements

- Real trained AI model integration
- Cloud deployment
- Doctor authentication
- Patient management system
- PDF report generation
- Multi-language support

---

#  Developer

**S. Veera Mallesh**

-  Portfolio: https://veeramallesh-portfolio.netlify.app
-  LinkedIn: https://www.linkedin.com/in/veeramallesh-sunkara/
-  GitHub: https://github.com/Veeramallesh94

---

##  If you found this project useful, consider giving it a Star!
