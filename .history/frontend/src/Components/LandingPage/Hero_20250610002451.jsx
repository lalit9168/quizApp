<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QuizMaster - Hero Section</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
        }

        .hero-section {
            position: relative;
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            overflow: hidden;
            display: flex;
            align-items: center;
            padding: 2rem 0;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
            position: relative;
            z-index: 2;
        }

        .hero-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
            min-height: 80vh;
        }

        /* Left Side - Quiz Interface */
        .quiz-interface {
            position: relative;
            max-width: 500px;
            margin: 0 auto;
        }

        .quiz-mockup {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 1.5rem;
            padding: 2rem;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(20px);
            border: 2px solid rgba(255, 255, 255, 0.2);
            position: relative;
            z-index: 2;
            animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }

        .quiz-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }

        .quiz-logo {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .quiz-icon {
            width: 28px;
            height: 28px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
        }

        .quiz-title {
            font-size: 1.2rem;
            font-weight: 700;
            color: #333;
        }

        .question-counter {
            padding: 0.5rem 1rem;
            border-radius: 1rem;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            font-size: 0.9rem;
            font-weight: 600;
        }

        .progress-bar {
            width: 100%;
            height: 8px;
            background: #f0f0f0;
            border-radius: 4px;
            margin-bottom: 2rem;
            overflow: hidden;
        }

        .progress-fill {
            height: 100%;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 4px;
            width: 30%;
            animation: progress 3s ease-out;
        }

        @keyframes progress {
            from { width: 0%; }
            to { width: 30%; }
        }

        .question-text {
            font-size: 1.2rem;
            font-weight: 600;
            color: #333;
            margin-bottom: 1.5rem;
        }

        .answer-options {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }

        .answer-option {
            padding: 1rem;
            border-radius: 0.75rem;
            border: 2px solid #e0e0e0;
            background: #f9f9f9;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .answer-option:hover {
            border-color: #667eea;
            background: rgba(102, 126, 234, 0.05);
            transform: translateX(5px);
        }

        .answer-option.correct {
            background: rgba(102, 126, 234, 0.1);
            border-color: #667eea;
        }

        .option-radio {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 2px solid #ccc;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }

        .option-radio.selected {
            border-color: #667eea;
            background: #667eea;
        }

        .option-radio.selected::after {
            content: '✓';
            color: white;
            font-size: 12px;
            font-weight: bold;
        }

        .timer {
            margin-top: 1.5rem;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
        }

        .timer-text {
            color: #666;
            font-size: 0.9rem;
        }

        .timer-value {
            color: #f093fb;
            font-weight: 700;
            font-size: 1rem;
        }

        /* Floating Stats */
        .floating-stat {
            position: absolute;
            background: rgba(240, 147, 251, 0.9);
            color: white;
            padding: 1rem;
            border-radius: 0.75rem;
            box-shadow: 0 10px 30px rgba(240, 147, 251, 0.4);
            backdrop-filter: blur(10px);
            text-align: center;
            min-width: 100px;
            z-index: 3;
        }

        .floating-stat-1 {
            top: -20px;
            right: -40px;
            animation: floatStat1 3s ease-in-out infinite;
        }

        .floating-stat-2 {
            bottom: -30px;
            left: -30px;
            background: rgba(102, 126, 234, 0.9);
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
            animation: floatStat2 4s ease-in-out infinite 1s;
        }

        @keyframes floatStat1 {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }

        @keyframes floatStat2 {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(10px); }
        }

        .stat-icon {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
        }

        .stat-text {
            font-size: 0.85rem;
            font-weight: 600;
        }

        /* Right Side - Content */
        .hero-content {
            padding-left: 2rem;
        }

        .main-heading {
            font-size: clamp(2.5rem, 5vw, 4rem);
            font-weight: 800;
            background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: 0 4px 20px rgba(255, 255, 255, 0.3);
            letter-spacing: -0.02em;
            line-height: 1.1;
            margin-bottom: 1rem;
        }

        .brand-name {
            display: block;
            color: #f093fb;
        }

        .subtitle {
            font-size: 1.25rem;
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 2rem;
            font-weight: 400;
            letter-spacing: 0.01em;
            line-height: 1.6;
            max-width: 500px;
        }

        .highlight {
            color: