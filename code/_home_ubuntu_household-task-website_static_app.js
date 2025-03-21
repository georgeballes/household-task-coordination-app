// Task data
let tasks = [
  {
    id: 1,
    title: 'Prepare Dinner',
    assignedTo: 'You',
    day: 'Today',
    time: '6:00 PM',
    repeats: 'Weekdays',
    location: 'Kitchen',
    notes: 'Make pasta with garlic bread. Recipe is in the cookbook.',
    completed: false,
    color: '#4A80F0'
  },
  {
    id: 2,
    title: 'Laundry',
    assignedTo: 'You',
    day: 'Today',
    time: '3:00 PM',
    repeats: 'Weekly',
    location: 'Laundry Room',
    notes: 'Don\'t forget to separate colors and whites.',
    completed: false,
    color: '#F5A623'
  },
  {
    id: 3,
    title: 'Clean Kitchen',
    assignedTo: 'Sam',
    day: 'Tomorrow',
    time: '10:00 AM',
    repeats: 'Weekly',
    location: 'Kitchen',
    notes: 'Deep clean the oven and microwave.',
    completed: false,
    color: '#4CAF50'
  },
  {
    id: 4,
    title: 'Grocery Shopping',
    assignedTo: 'Taylor',
    day: 'Wed',
    time: '5:00 PM',
    repeats: 'Weekly',
    location: 'Supermarket',
    notes: 'Get items from the shared shopping list.',
    completed: false,
    color: '#F44336'
  }
];

// User data
const currentUser = {
  id: 1,
  name: 'Alex Johnson',
  email: 'alex@example.com',
  household: 'Johnson Residence',
  avatar: 'A',
  stats: {
    totalTasks: 12,
    completedTasks: 8,
    pendingTasks: 4
  }
};

// Household members
const members = [
  { id: 1, name: 'You (Alex)', avatar: 'A' },
  { id: 2, name: 'Sam', avatar: 'S' },
  { id: 3, name: 'Taylor', avatar: 'T' }
];

// DOM Elements
const loginPage = document.getElementById('login-page');
const mainApp = document.getElementById('main-app');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const homePage = document.getElementById('home-page');
const tasksPage = document.getElementById('tasks-page');
const taskDetailPage = document.getElementById('task-detail-page');
const addTaskPage = document.getElementById('add-task-page');
const calendarPage = document.getElementById('calendar-page');
const profilePage = document.getElementById('profile-page');

const todayTaskCount = document.getElementById('today-task-count');
const todayTasks = document.getElementById('today-tasks');
const allTasks = document.getElementById('all-tasks');

const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const tabs = document.querySelectorAll('.tab');

const addTaskBtn = document.getElementById('add-task-btn');
const backToTasksBtn = document.getElementById('back-to-tasks-btn');
const backFromAddBtn = document.getElementById('back-from-add-btn');
const logoutBtn = document.getElementById('logout-btn');

// Initialize the app
function initApp() {
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  if (isLoggedIn) {
    showMainApp();
    renderTasks();
    setupCalendar();
  } else {
    showLoginPage();
  }
  
  // Setup event listeners
  setupEventListeners();
}

// Event listeners
function setupEventListeners() {
  // Login form
  loginForm.addEventListener('submit', handleLogin);
  
  // Navigation
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = e.target.dataset.page;
      navigateTo(page);
    });
  });
  
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = e.target.dataset.page;
      navigateTo(page);
    });
  });
  
  // Task tabs
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.dataset.filter;
      filterTasks(filter);
      
      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });
  
  // Add task button
  addTaskBtn.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('add-task');
  });
  
  // Back buttons
  backToTasksBtn.addEventListener('click', () => {
    navigateTo('tasks');
  });
  
  backFromAddBtn.addEventListener('click', () => {
    navigateTo('tasks');
  });
  
  // Task form
  document.getElementById('add-task-form').addEventListener('submit', handleAddTask);
  
  // Task detail actions
  document.getElementById('complete-task-btn').addEventListener('click', handleCompleteTask);
  document.getElementById('reassign-task-btn').addEventListener('click', toggleReassignOptions);
  document.getElementById('delete-task-btn').addEventListener('click', handleDeleteTask);
  
  // Logout
  logoutBtn.addEventListener('click', handleLogout);
}

// Login handler
function handleLogin(e) {
  e.preventDefault();
  
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  
  if (!email || !password) {
    showLoginError('Please enter both email and password');
    return;
  }
  
  // In a real app, we would validate credentials
  // For the prototype, we'll just log in
  localStorage.setItem('isLoggedIn', 'true');
  showMainApp();
  renderTasks();
  setupCalendar();
}

// Show login error
function showLoginError(message) {
  loginError.textContent = message;
  loginError.classList.remove('hidden');
}

// Show main app
function showMainApp() {
  loginPage.classList.add('hidden');
  mainApp.classList.remove('hidden');
  navigateTo('home');
}

// Show login page
function showLoginPage() {
  mainApp.classList.add('hidden');
  loginPage.classList.remove('hidden');
}

// Navigation
function navigateTo(page) {
  // Hide all pages
  homePage.classList.add('hidden');
  tasksPage.classList.add('hidden');
  taskDetailPage.classList.add('hidden');
  addTaskPage.classList.add('hidden');
  calendarPage.classList.add('hidden');
  profilePage.classList.add('hidden');
  
  // Show selected page
  switch (page) {
    case 'home':
      homePage.classList.remove('hidden');
      break;
    case 'tasks':
      tasksPage.classList.remove('hidden');
      break;
    case 'task-detail':
      taskDetailPage.classList.remove('hidden');
      break;
    case 'add-task':
      addTaskPage.classList.remove('hidden');
      break;
    case 'calendar':
      calendarPage.classList.remove('hidden');
      break;
    case 'profile':
      profilePage.classList.remove('hidden');
      break;
  }
  
  // Update active nav link
  navLinks.forEach(link => {
    if (link.dataset.page === page) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
  
  mobileNavLinks.forEach(link => {
    if (link.dataset.page === page) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Render tasks
function renderTasks() {
  // Count today's tasks
  const todaysTasksCount = tasks.filter(task => task.day === 'Today' && !task.completed).length;
  todayTaskCount.textContent = todaysTasksCount;
  
  // Render today's tasks
  todayTasks.innerHTML = '';
  
  const todayTasksList = tasks.filter(task => task.day === 'Today' && !task.completed);
  
  if (todayTasksList.length === 0) {
    todayTasks.innerHTML = `
      <div class="card text-center">
        <p class="text-medium">No tasks for today</p>
        <button class="btn btn-primary" onclick="navigateTo('add-task')">Add Task</button>
      </div>
    `;
  } else {
    todayTasksList.forEach(task => {
      todayTasks.appendChild(createTaskElement(task));
    });
  }
  
  // Render all tasks
  renderAllTasks();
}

// Render all tasks
function renderAllTasks() {
  allTasks.innerHTML = '';
  
  if (tasks.length === 0) {
    allTasks.innerHTML = `
      <div class="card text-center">
        <p class="text-medium">No tasks found</p>
      </div>
    `;
  } else {
    tasks.forEach(task => {
      allTasks.appendChild(createTaskElement(task));
    });
  }
}

// Create task element
function createTaskElement(task) {
  const taskElement = document.createElement('div');
  taskElement.className = 'task-item';
  taskElement.innerHTML = `
    <div class="task-color" style="background-color: ${task.color}"></div>
    <div class="task-content" onclick="showTaskDetail(${task.id})">
      <div class="task-title ${task.completed ? 'line-through text-medium' : ''}">${task.title}</div>
      <div class="task-info">${task.assignedTo} • ${task.time}</div>
    </div>
    <div class="task-action">
      <div class="task-checkbox ${task.completed ? 'checked' : ''}" onclick="toggleTaskCompletion(event, ${task.id})">
        ${task.completed ? '<svg class="icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>' : ''}
      </div>
    </div>
  `;
  
  return taskElement;
}

// Filter tasks
function filterTasks(filter) {
  allTasks.innerHTML = '';
  
  let filteredTasks;
  
  switch (filter) {
    case 'mine':
      filteredTasks = tasks.filter(task => task.assignedTo === 'You');
      break;
    case 'shared':
      filteredTasks = tasks.filter(task => task.assignedTo !== 'You');
      break;
    default:
      filteredTasks = tasks;
  }
  
  if (filteredTasks.length === 0) {
    allTasks.innerHTML = `
      <div class="card text-center">
        <p class="text-medium">No tasks found</p>
      </div>
    `;
  } else {
    filteredTasks.forEach(task => {
      allTasks.appendChild(createTaskElement(task));
    });
  }
}

// Toggle task completion
function toggleTaskCompletion(event, taskId) {
  event.stopPropagation();
  
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.completed = !task.completed;
    
    // Update UI
    renderTasks();
  }
}

// Show task detail
function showTaskDetail(taskId) {
  const task = tasks.find(t => t.id === taskId);
  
  if (task) {
    // Update task detail page
    document.getElementById('task-detail-title').textContent = task.title;
    document.getElementById('task-detail-assignee').textContent = task.assignedTo;
    document.getElementById('task-detail-date').textContent = task.day;
    document.getElementById('task-detail-time').textContent = task.time;
    document.getElementById('task-detail-repeats').textContent = task.repeats || 'Never';
    document.getElementById('task-detail-location').textContent = task.location || 'Not specified';
    document.getElementById('task-detail-notes').textContent = task.notes || 'No notes added.';
    
    // Store current task ID
    taskDetailPage.dataset.taskId = taskId;
    
    // Navigate to detail page
    navigateTo('task-detail');
  }
}

// Handle complete task
function handleCompleteTask() {
  const taskId = parseInt(taskDetailPage.dataset.taskId);
  const task = tasks.find(t => t.id === taskId);
  
  if (task) {
    task.completed = true;
    
    // Show confirmation
    alert('Task marked as complete!');
    
    // Navigate back to tasks
    setTimeout(() => {
      navigateTo('tasks');
      renderTasks();
    }, 500);
  }
}

// Toggle reassign options
function toggleReassignOptions() {
  const reassignOptions = document.getElementById('reassign-options');
  reassignOptions.classList.toggle('hidden');
  
  // Setup reassign options if showing
  if (!reassignOptions.classList.contains('hidden')) {
    const options = reassignOptions.querySelectorAll('.reassign-option');
    
    options.forEach(option => {
      option.addEventListener('click', () => {
        const member = option.dataset.member;
        reassignTask(member);
      });
    });
  }
}

// Reassign task
function reassignTask(member) {
  const taskId = parseInt(taskDetailPage.dataset.taskId);
  const task = tasks.find(t => t.id === taskId);
  
  if (task) {
    // Format member name
    const assignee = member.includes('You') ? 'You' : member;
    
    // Update task
    task.assignedTo = assignee;
    
    // Update UI
    document.getElementById('task-detail-assignee').textContent = assignee;
    
    // Hide reassign options
    document.getElementById('reassign-options').classList.add('hidden');
    
    // Show confirmation
    alert(`Task reassigned to ${assignee}!`);
  }
}

// Handle delete task
function handleDeleteTask() {
  const taskId = parseInt(taskDetailPage.dataset.taskId);
  
  if (confirm('Are you sure you want to delete this task?')) {
    // Remove task
    tasks = tasks.filter(t => t.id !== taskId);
    
    // Navigate back to tasks
    navigateTo('tasks');
    renderTasks();
  }
}

// Handle add task
function handleAddTask(e) {
  e.preventDefault();
  
  const taskName = document.getElementById('task-name').value.trim();
  const assignee = document.getElementById('task-assignee').value;
  const date = document.getElementById('task-date').value.trim() || 'Today';
  const time = document.getElementById('task-time').value.trim() || '12:00 PM';
  const repeat = document.getElementById('task-repeat').value;
  const location = document.getElementById('task-location').value.trim();
  const notes = document.getElementById('task-notes').value.trim();
  
  if (!taskName) {
    alert('Please enter a task name');
    return;
  }
  
  // Create new task
  const newTask = {
    id: tasks.length + 1,
    title: taskName,
    assignedTo: assignee,
    day: date,
    time: time,
    repeats: repeat,
    location: location,
    notes: notes,
    completed: false,
    color: getRandomColor()
  };
  
  // Add task
  tasks.push(newTask);
  
  // Reset form
  document.getElementById('add-task-form').reset();
  
  // Show confirmation
  alert('Task added successfully!');
  
  // Navigate back to tasks
  navigateTo('tasks');
  renderTasks();
}

// Get random color
function getRandomColor() {
  const colors = ['#4A80F0', '#F5A623', '#4CAF50', '#F44336'];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Setup calendar
function setupCalendar() {
  const calendarGrid = document.querySelector('.calendar-grid');
  calendarGrid.innerHTML = '';
  
  // Generate calendar days
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  
  // Add empty cells for days before the first of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    const emptyDay = document.createElement('div');
    emptyDay.className = 'calendar-day other-month';
    calendarGrid.appendChild(emptyDay);
  }
  
  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    dayElement.textContent = i;
    
    // Check if it's today
    if (i === today.getDate()) {
      dayElement.classList.add('today');
    }
    
    // Check if day has tasks
    const hasTask = tasks.some(task => {
      // In a real app, we would convert task.day to a date
      // For the prototype, we'll use hardcoded logic
      if (task.day === 'Today' && i === today.getDate()) return true;
      if (task.day === 'Tomorrow' && i === today.getDate() + 1) return true;
      return false;
    });
    
    if (hasTask) {
      dayElement.classList.add('has-task');
    }
    
    // Add click event
    dayElement.addEventListener('click', () => {
      // Update selected date
      document.querySelectorAll('.calendar-day').forEach(day => {
        day.classList.remove('selected');
      });
      dayElement.classList.add('selected');
      
      // Update schedule title
      document.getElementById('selected-date').textContent = `March ${i} Schedule`;
      
      // Render scheduled tasks
      renderScheduledTasks(i);
    });
    
    calendarGrid.appendChild(dayElement);
  }
  
  // Render today's scheduled tasks by default
  renderScheduledTasks(today.getDate());
<response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>