function formatBytes(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

function getUserPlanDetails(userId) {
    const users = JSON.parse(localStorage.getItem('users'));
    const userPlans = JSON.parse(localStorage.getItem('userPlans'));
    
    const user = users.find(u => u.id === userId);
    const plan = userPlans.find(p => p.userId === userId);
    
    return { user, plan };
}

function updateStorageUsage(userId, newUsage) {
    const users = JSON.parse(localStorage.getItem('users'));
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex !== -1) {
        users[userIndex].storageUsed = newUsage;
        localStorage.setItem('users', JSON.stringify(users));
    }
} 