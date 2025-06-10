<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz Dashboard</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #f8fafc;
            color: #1e293b;
            line-height: 1.6;
        }

        /* Navbar Styles */
        .navbar {
            background-color: #ffffff;
            border-bottom: 1px solid #e2e8f0;
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .navbar-brand {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .navbar-icon {
            width: 40px;
            height: 40px;
            background: #3b82f6;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.2rem;
        }

        .navbar-title {
            font-size: 1.25rem;
            font-weight: 700;
            color: #1e293b;
            cursor: pointer;
            transition: color 0.2s ease;
        }

        .navbar-title:hover {
            color: #3b82f6;
        }

        .navbar-user {
            display: flex;
            align-items: center;
            gap: 1.5rem;
        }

        .user-info {
            text-align: right;
        }

        .user-role {
            font-size: 0.875rem;
            color: #64748b;
        }

        .user-name {
            font-weight: 600;
            color: #1e293b;
            text-transform: capitalize;
        }

        .logout-btn {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            color: #64748b;
            padding: 0.5rem 1.5rem;
            border-radius: 0.5rem;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .logout-btn:hover {
            background-color: #fee2e2;
            border-color: #fca5a5;
            color: #dc2626;
        }

        /* Main Content */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 3rem 2rem;
        }

        .header {
            text-align: center;
            margin-bottom: 4rem;
        }

        .header h1 {
            font-size: 2.5rem;
            font-weight: 800;
            color: #1e293b;
            margin-bottom: 1rem;
            letter-spacing: -0.025em;
        }

        .header p {
            font-size: 1.125rem;
            color: #64748b;
            max-width: 600px;
            margin: 0 auto;
        }

        /* Cards Grid */
        .cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 2rem;
            margin-bottom: 4rem;
        }

        .card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 1rem;
            overflow: hidden;
            transition: all 0.3s ease;
            cursor: pointer;
            height: 100%;
            display: flex;
            flex-direction: column;
        }

        .card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            border-color: var(--card-color);
        }

        .card-header {
            padding: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            overflow: hidden;
        }

        .card-icon {
            font-size: 2.5rem;
            color: var(--card-color);
            z-index: 1;
            position: relative;
        }

        .card-bg-pattern {
            position: absolute;
            top: -20px;
            right: -20px;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background-color: var(--card-color);
            opacity: 0.1;
        }

        .card-content {
            padding: 1.5rem;
            flex-grow: 1;
            text-align: center;
        }

        .card-title {
            font-size: 1.25rem;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 1rem;
        }

        .card-description {
            color: #64748b;
            line-height: 1.6;
        }

        .card-actions {
            padding: 1.5rem;
            padding-top: 0;
        }

        .card-btn {
            width: 100%;
            background: var(--card-color);
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .card-btn:hover {
            opacity: 0.9;
            box-shadow: 0 8px 20px rgba(var(--card-color-rgb), 0.25);
        }

        /* Individual card colors */
        .card-blue {
            --card-color: #3b82f6;
            --card-color-rgb: 59, 130, 246;
        }

        .card-blue .card-header {
            background-color: rgba(59, 130, 246, 0.1);
        }

        .card-purple {
            --card-color: #8b5cf6;
            --card-color-rgb: 139, 92, 246;
        }

        .card-purple .card-header {
            background-color: rgba(139, 92, 246, 0.1);
        }

        .card-green {
            --card-color: #10b981;
            --card-color-rgb: 16, 185, 129;
        }

        .card-green .card-header {
            background-color: rgba(16, 185, 129, 0.1);
        }

        /* Stats Section */
        .stats-section {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 1rem;
            padding: 2rem;
            max-width: 800px;
            margin: 0 auto;
        }

        .stats-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: #1e293b;
            text-align: center;
            margin-bottom: 2rem;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
            text-align: center;
        }

        .stat-item h3 {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
        }

        .stat-blue { color: #3b82f6; }
        .stat-green { color: #10b981; }
        .stat-purple { color: #8b5cf6; }

        .stat-item p {
            color: #64748b;
            font-size: 0.875rem;
        }

        /* Footer */
        .footer {
            background-color: #ffffff;
            border-top: 1px solid #e2e8f0;
            padding: 2rem;
            margin-top: 3rem;
            text-align: center;
        }

        .footer p {
            color: #64748b;
            font-weight: 500;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .navbar {
                padding: 1rem;
                flex-direction: column;
                gap: 1rem;
            }

            .navbar-user {
                width: 100%;
                justify-content: space-between;
            }

            .container {
                padding: 2rem 1rem;
            }

            .header h1 {
                font-size: 2rem;
            }

            .cards-grid {
                grid-template-columns: 1fr;
                gap: 1.5rem;
            }
        }

        /* Animation */
        .fade-in {
            animation: fadeIn 0.6s ease-in;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .card:nth-child(1) { animation-delay: 0.1s; }
        .card:nth-child(2) { animation-delay: 0.2s; }
        .card:nth-child(3) { animation-delay: 0.3s; }
    </style>
</head>
<body>
    <!-- Navbar -->
    <nav class="navbar">
        <div class="navbar-brand">
            <div class="navbar-icon">📊</div>
            <h1 class="navbar-title">Quiz Dashboard</h1>
        </div>
        <div class="navbar-user">
            <div class="user-info">
                <div class="user-role">Logged in as</div>
                <div class="user-name" id="userRole">Admin</div>
            </div>
            <button class="logout-btn" onclick="handleLogout()">
                🚪 Logout
            </button>
        </div>
    </nav>

    <!-- Main Content -->
    <div class="container fade-in">
        <!-- Header -->
        <div class="header">
            <h1>Welcome to Your Dashboard</h1>
            <p id="headerDescription">Manage quizzes, create content, and oversee quiz activities</p>
        </div>

        <!-- Cards Grid -->
        <div class="cards-grid" id="cardsGrid">
            <!-- Cards will be populated by JavaScript -->
        </div>

        <!-- Stats Section -->
        <div class="stats-section fade-in">
            <h2 class="stats-title">Quick Stats</h2>
            <div class="stats-grid">
                <div class="stat-item">
                    <h3 class="stat-blue" id="stat1">∞</h3>
                    <p id="stat1Label">Quiz Creation</p>
                </div>
                <div class="stat-item">
                    <h3 class="stat-green">24/7</h3>
                    <p>Platform Access</p>
                </div>
                <div class="stat-item">
                    <h3 class="stat-purple">100%</h3>
                    <p>Uptime Guarantee</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="footer">
        <p>&copy; 2024 Quiz Dashboard. Built with precision and care.</p>
    </footer>

    <script>
        // Simulate role detection
        let userRole = 'admin'; // This would come from your authentication system

        // Card data
        const cardData = [
            {
                title: "Create Quiz",
                description: "Design and create custom quizzes with multiple question types",
                icon: "📝",
                action: "handleCreateQuiz",
                colorClass: "card-blue",
                adminOnly: true,
            },
            {
                title: "Guest Quiz",
                description: "Create quizzes for guests to participate without registration",
                icon: "👥",
                action: "handleGuestQuiz",
                colorClass: "card-purple",
                adminOnly: true,
            },
            {
                title: "Available Quizzes",
                description: "Browse and participate in available quizzes",
                icon: "📋",
                action: "handleJoinQuiz",
                colorClass: "card-green",
                adminOnly: false,
            },
        ];

        // Initialize the page
        function initializePage() {
            const roleElement = document.getElementById('userRole');
            const headerDesc = document.getElementById('headerDescription');
            const stat1 = document.getElementById('stat1');
            const stat1Label = document.getElementById('stat1Label');

            // Update UI based on role
            roleElement.textContent = userRole;
            
            if (userRole === 'admin') {
                headerDesc.textContent = "Manage quizzes, create content, and oversee quiz activities";
                stat1.textContent = "∞";
                stat1Label.textContent = "Quiz Creation";
            } else {
                headerDesc.textContent = "Browse and participate in available quizzes";
                stat1.textContent = "5+";
                stat1Label.textContent = "Quizzes Available";
            }

            // Generate cards
            generateCards();
        }

        function generateCards() {
            const cardsGrid = document.getElementById('cardsGrid');
            const filteredCards = userRole === 'admin' 
                ? cardData 
                : cardData.filter(card => !card.adminOnly);

            cardsGrid.innerHTML = filteredCards.map(card => `
                <div class="card ${card.colorClass} fade-in" onclick="${card.action}()">
                    <div class="card-header">
                        <div class="card-icon">${card.icon}</div>
                        <div class="card-bg-pattern"></div>
                    </div>
                    <div class="card-content">
                        <h3 class="card-title">${card.title}</h3>
                        <p class="card-description">${card.description}</p>
                    </div>
                    <div class="card-actions">
                        <button class="card-btn" onclick="event.stopPropagation(); ${card.action}()">
                            Get Started
                        </button>
                    </div>
                </div>
            `).join('');
        }

        // Action handlers
        function handleCreateQuiz() {
            alert('Navigating to Create Quiz...');
            // navigate("/quiz");
        }

        function handleGuestQuiz() {
            alert('Navigating to Guest Quiz...');
            // navigate("/create-guest");
        }

        function handleJoinQuiz() {
            alert('Navigating to Available Quizzes...');
            // navigate("/quizdash");
        }

        function handleLogout() {
            if (confirm('Are you sure you want to logout?')) {
                alert('Logging out...');
                // localStorage.removeItem("token");
                // localStorage.removeItem("role");
                // navigate("/");
            }
        }

        // Initialize when page loads
        document.addEventListener('DOMContentLoaded', initializePage);

        // Demo: Switch between admin and user roles
        function toggleRole() {
            userRole = userRole === 'admin' ? 'user' : 'admin';
            initializePage();
        }

        // Add a demo button to switch roles (remove in production)
        document.addEventListener('DOMContentLoaded', function() {
            const navbar = document.querySelector('.navbar-user');
            const toggleBtn = document.createElement('button');
            toggleBtn.textContent = 'Toggle Role (Demo)';
            toggleBtn.style.cssText = 'margin-left: 1rem; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; background: #f9f9f9; cursor: pointer;';
            toggleBtn.onclick = toggleRole;
            navbar.appendChild(toggleBtn);
        });
    </script>
</body>
</html>