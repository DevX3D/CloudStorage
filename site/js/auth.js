function initializeStorage() {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }
    if (!localStorage.getItem('userPlans')) {
        localStorage.setItem('userPlans', JSON.stringify([]));
    }
    if (!localStorage.getItem('savedCredentials')) {
        localStorage.setItem('savedCredentials', JSON.stringify([]));
    }
}

function registerUser(username, email, password) {
    const users = JSON.parse(localStorage.getItem('users'));
    const userPlans = JSON.parse(localStorage.getItem('userPlans'));
    
    if (users.some(user => user.username === username || user.email === email)) {
        throw new Error('Username or email already exists!');
    }
    
    const userId = Date.now();
    const storageLimit = 3 * 1024 * 1024 * 1024;

    const newUser = {
        id: userId,
        username,
        email,
        password,
        storageUsed: 0,
        storageLimit: storageLimit,
        createdAt: new Date().toISOString()
    };

    const userPlan = {
        userId: userId,
        planType: 'free',
        storageLimit: storageLimit,
        activatedAt: new Date().toISOString()
    };

    const credentials = {
        userId: userId,
        username,
        password
    };

    users.push(newUser);
    userPlans.push(userPlan);
    
    const savedCredentials = JSON.parse(localStorage.getItem('savedCredentials'));
    savedCredentials.push(credentials);

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('userPlans', JSON.stringify(userPlans));
    localStorage.setItem('savedCredentials', JSON.stringify(savedCredentials));

    return newUser;
}

function loginUser(username, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userPlans = JSON.parse(localStorage.getItem('userPlans') || '[]');
    
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
        throw new Error('Invalid username or password!');
    }

    const userPlan = userPlans.find(p => p.userId === user.id);
    
    const session = {
        userId: user.id,
        username: user.username,
        planType: userPlan.planType,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    };

    updateSavedCredentials(user.id, username, password);
    
    localStorage.setItem('currentSession', JSON.stringify(session));
    return session;
}
function updateSavedCredentials(userId, username, password) {
    const savedCredentials = JSON.parse(localStorage.getItem('savedCredentials') || '[]');
    const existingCredIndex = savedCredentials.findIndex(c => c.username === username);
    
    if (existingCredIndex === -1) {
        savedCredentials.push({ userId, username, password });
    } else {
        savedCredentials[existingCredIndex] = { userId, username, password };
    }
    
    localStorage.setItem('savedCredentials', JSON.stringify(savedCredentials));
}

function checkSession() {
    const session = JSON.parse(localStorage.getItem('currentSession'));
    if (!session || new Date(session.expiresAt) < new Date()) {
        return null;
    }
    return session;
}

function logoutUser() {
    localStorage.removeItem('currentSession');
}

function loadSavedCredentials() {
    const savedCredentials = JSON.parse(localStorage.getItem('savedCredentials') || '[]');
    return savedCredentials.length > 0 ? savedCredentials[savedCredentials.length - 1] : null;
} 