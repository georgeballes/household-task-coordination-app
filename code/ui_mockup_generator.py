import drawsvg as draw
import os

# Create directory for mockups if it doesn't exist
os.makedirs('/home/ubuntu/household_app/design/mockups', exist_ok=True)

# Define iPhone dimensions (iPhone 13 dimensions in pixels)
IPHONE_WIDTH = 390
IPHONE_HEIGHT = 844
CORNER_RADIUS = 40

# Define colors
PRIMARY_COLOR = '#4A80F0'  # Blue
SECONDARY_COLOR = '#F5A623'  # Orange/Yellow
BACKGROUND_COLOR = '#F8F8F8'  # Light gray
TEXT_COLOR = '#333333'  # Dark gray
LIGHT_TEXT_COLOR = '#777777'  # Medium gray
SUCCESS_COLOR = '#4CAF50'  # Green
DANGER_COLOR = '#F44336'  # Red

def create_iphone_frame(title):
    """Create a basic iPhone frame with status bar and title"""
    d = draw.Drawing(IPHONE_WIDTH, IPHONE_HEIGHT, origin=(0, 0))
    
    # Background
    d.append(draw.Rectangle(0, 0, IPHONE_WIDTH, IPHONE_HEIGHT, 
                           rx=CORNER_RADIUS, ry=CORNER_RADIUS,
                           fill=BACKGROUND_COLOR))
    
    # Status bar
    d.append(draw.Rectangle(0, 0, IPHONE_WIDTH, 44, 
                           rx=CORNER_RADIUS, ry=CORNER_RADIUS,
                           fill='white'))
    
    # Title bar
    d.append(draw.Rectangle(0, 44, IPHONE_WIDTH, 50, fill='white'))
    d.append(draw.Text(title, 24, IPHONE_WIDTH/2, 74, 
                      text_anchor='middle', fill=TEXT_COLOR, font_weight='bold'))
    
    # Bottom navigation bar
    d.append(draw.Rectangle(0, IPHONE_HEIGHT-80, IPHONE_WIDTH, 80, 
                           rx=0, ry=0, fill='white'))
    
    # Navigation icons
    icon_positions = [(IPHONE_WIDTH/5), (IPHONE_WIDTH/5)*2, (IPHONE_WIDTH/5)*3, (IPHONE_WIDTH/5)*4]
    icon_labels = ['Home', 'Tasks', 'Calendar', 'Profile']
    
    for i, (pos, label) in enumerate(zip(icon_positions, icon_labels)):
        # Icon circle
        d.append(draw.Circle(pos, IPHONE_HEIGHT-50, 15, 
                            fill=PRIMARY_COLOR if i == 1 else 'lightgray'))
        # Label
        d.append(draw.Text(label, 12, pos, IPHONE_HEIGHT-20, 
                          text_anchor='middle', fill=TEXT_COLOR))
    
    return d

def create_login_screen():
    """Create login screen mockup"""
    d = create_iphone_frame('Welcome')
    
    # App logo
    d.append(draw.Circle(IPHONE_WIDTH/2, 200, 60, fill=PRIMARY_COLOR))
    d.append(draw.Text('HT', 60, IPHONE_WIDTH/2, 220, 
                      text_anchor='middle', fill='white', font_weight='bold'))
    
    d.append(draw.Text('HomeTask', 32, IPHONE_WIDTH/2, 300, 
                      text_anchor='middle', fill=TEXT_COLOR, font_weight='bold'))
    
    # Input fields
    field_width = 300
    for i, label in enumerate(['Email', 'Password']):
        y_pos = 380 + i*80
        # Field background
        d.append(draw.Rectangle((IPHONE_WIDTH-field_width)/2, y_pos, 
                               field_width, 50, rx=8, ry=8, fill='white'))
        # Field label
        d.append(draw.Text(label, 16, (IPHONE_WIDTH-field_width)/2 + 20, y_pos + 30, 
                          fill=LIGHT_TEXT_COLOR))
    
    # Login button
    button_width = 200
    d.append(draw.Rectangle((IPHONE_WIDTH-button_width)/2, 550, 
                           button_width, 50, rx=25, ry=25, fill=PRIMARY_COLOR))
    d.append(draw.Text('Log In', 18, IPHONE_WIDTH/2, 580, 
                      text_anchor='middle', fill='white', font_weight='bold'))
    
    # Sign up link
    d.append(draw.Text('Don\'t have an account? Sign Up', 14, IPHONE_WIDTH/2, 620, 
                      text_anchor='middle', fill=PRIMARY_COLOR))
    
    d.save_svg('/home/ubuntu/household_app/design/mockups/login_screen.svg')
    return d

def create_home_screen():
    """Create home screen mockup"""
    d = create_iphone_frame('Home')
    
    # Welcome section
    d.append(draw.Rectangle(20, 110, IPHONE_WIDTH-40, 80, rx=10, ry=10, fill='white'))
    d.append(draw.Text('Welcome back, Alex!', 20, 40, 140, fill=TEXT_COLOR, font_weight='bold'))
    d.append(draw.Text('You have 3 tasks today', 16, 40, 170, fill=LIGHT_TEXT_COLOR))
    
    # Today's tasks section
    d.append(draw.Text('Today\'s Tasks', 18, 30, 220, fill=TEXT_COLOR, font_weight='bold'))
    
    # Task cards
    task_data = [
        {'title': 'Prepare Dinner', 'time': '6:00 PM', 'color': PRIMARY_COLOR},
        {'title': 'Laundry', 'time': '8:00 PM', 'color': SECONDARY_COLOR},
    ]
    
    for i, task in enumerate(task_data):
        y_pos = 240 + i*90
        # Card background
        d.append(draw.Rectangle(20, y_pos, IPHONE_WIDTH-40, 80, rx=10, ry=10, fill='white'))
        # Colored indicator
        d.append(draw.Rectangle(20, y_pos, 10, 80, rx=5, ry=5, fill=task['color']))
        # Task title
        d.append(draw.Text(task['title'], 18, 50, y_pos + 30, fill=TEXT_COLOR, font_weight='bold'))
        # Task time
        d.append(draw.Text(task['time'], 14, 50, y_pos + 55, fill=LIGHT_TEXT_COLOR))
        # Checkbox
        d.append(draw.Circle(IPHONE_WIDTH-60, y_pos + 40, 15, fill='none', stroke=LIGHT_TEXT_COLOR, stroke_width=2))
    
    # Upcoming section
    d.append(draw.Text('Upcoming', 18, 30, 440, fill=TEXT_COLOR, font_weight='bold'))
    
    # Calendar preview
    calendar_width = IPHONE_WIDTH-40
    calendar_height = 180
    d.append(draw.Rectangle(20, 460, calendar_width, calendar_height, rx=10, ry=10, fill='white'))
    
    # Days of week
    days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
    day_width = calendar_width / 7
    
    for i, day in enumerate(days):
        x_pos = 20 + i * day_width + day_width/2
        d.append(draw.Text(day, 14, x_pos, 485, text_anchor='middle', fill=LIGHT_TEXT_COLOR))
        
        # Date circles
        date_y = 520
        date_num = i + 20  # Just example dates
        
        circle_fill = 'white'
        text_fill = TEXT_COLOR
        
        # Highlight current day
        if i == 2:  # Wednesday in this example
            circle_fill = PRIMARY_COLOR
            text_fill = 'white'
        
        d.append(draw.Circle(x_pos, date_y, 18, fill=circle_fill))
        d.append(draw.Text(str(date_num), 16, x_pos, date_y + 5, 
                          text_anchor='middle', fill=text_fill))
        
        # Task indicators (dots)
        if i in [0, 2, 4]:  # Days with tasks
            dot_y = 555
            d.append(draw.Circle(x_pos, dot_y, 4, fill=SECONDARY_COLOR if i == 0 else PRIMARY_COLOR))
    
    # Quick add button
    d.append(draw.Circle(IPHONE_WIDTH-50, IPHONE_HEIGHT-100, 30, fill=PRIMARY_COLOR))
    d.append(draw.Text('+', 40, IPHONE_WIDTH-50, IPHONE_HEIGHT-88, 
                      text_anchor='middle', fill='white', font_weight='bold'))
    
    d.save_svg('/home/ubuntu/household_app/design/mockups/home_screen.svg')
    return d

def create_task_list_screen():
    """Create task list screen mockup"""
    d = create_iphone_frame('Tasks')
    
    # Filter tabs
    tab_width = IPHONE_WIDTH / 3
    tabs = ['All', 'Mine', 'Shared']
    
    for i, tab in enumerate(tabs):
        x_pos = i * tab_width
        # Tab background
        fill_color = PRIMARY_COLOR if i == 0 else 'white'
        text_color = 'white' if i == 0 else TEXT_COLOR
        
        d.append(draw.Rectangle(x_pos, 110, tab_width, 40, fill=fill_color))
        d.append(draw.Text(tab, 16, x_pos + tab_width/2, 135, 
                          text_anchor='middle', fill=text_color, font_weight='bold'))
    
    # Task list
    tasks = [
        {'title': 'Prepare Dinner', 'assigned': 'You', 'day': 'Today', 'time': '6:00 PM', 'completed': False},
        {'title': 'Laundry', 'assigned': 'You', 'day': 'Today', 'time': '8:00 PM', 'completed': False},
        {'title': 'Clean Kitchen', 'assigned': 'Sam', 'day': 'Tomorrow', 'time': '10:00 AM', 'completed': False},
        {'title': 'Grocery Shopping', 'assigned': 'Alex', 'day': 'Wed', 'time': '5:00 PM', 'completed': True},
        {'title': 'Take Out Trash', 'assigned': 'You', 'day': 'Yesterday', 'time': '8:00 PM', 'completed': True},
    ]
    
    for i, task in enumerate(tasks):
        y_pos = 170 + i*90
        # Card background
        bg_color = 'white' if not task['completed'] else '#F0F0F0'
        d.append(draw.Rectangle(20, y_pos, IPHONE_WIDTH-40, 80, rx=10, ry=10, fill=bg_color))
        
        # Task title
        title_color = TEXT_COLOR if not task['completed'] else LIGHT_TEXT_COLOR
        title_decoration = '' if not task['completed'] else 'line-through'
        d.append(draw.Text(task['title'], 18, 60, y_pos + 30, 
                          fill=title_color, font_weight='bold', text_decoration=title_decoration))
        
        # Task details
        details = f"{task['assigned']} • {task['day']} {task['time']}"
        d.append(draw.Text(details, 14, 60, y_pos + 55, fill=LIGHT_TEXT_COLOR))
        
        # Checkbox
        if task['completed']:
            # Checked box
            d.append(draw.Circle(IPHONE_WIDTH-60, y_pos + 40, 15, fill=SUCCESS_COLOR))
            # Checkmark
            d.append(draw.Line(IPHONE_WIDTH-68, y_pos + 40, IPHONE_WIDTH-60, y_pos + 48, 
                              stroke='white', stroke_width=2))
            d.append(draw.Line(IPHONE_WIDTH-60, y_pos + 48, IPHONE_WIDTH-52, y_pos + 32, 
                              stroke='white', stroke_width=2))
        else:
            # Unchecked box
            d.append(draw.Circle(IPHONE_WIDTH-60, y_pos + 40, 15, 
                                fill='none', stroke=LIGHT_TEXT_COLOR, stroke_width=2))
    
    d.save_svg('/home/ubuntu/household_app/design/mockups/task_list_screen.svg')
    return d

def create_task_detail_screen():
    """Create task detail screen mockup"""
    d = create_iphone_frame('Task Details')
    
    # Back button
    d.append(draw.Text('< Back', 16, 20, 74, fill=PRIMARY_COLOR))
    
    # Task title
    d.append(draw.Text('Prepare Dinner', 24, IPHONE_WIDTH/2, 130, 
                      text_anchor='middle', fill=TEXT_COLOR, font_weight='bold'))
    
    # Task details card
    d.append(draw.Rectangle(20, 160, IPHONE_WIDTH-40, 200, rx=10, ry=10, fill='white'))
    
    # Details rows
    details = [
        {'label': 'Assigned to', 'value': 'You'},
        {'label': 'Date', 'value': 'Today, March 20'},
        {'label': 'Time', 'value': '6:00 PM'},
        {'label': 'Repeats', 'value': 'Every Monday, Wednesday'},
        {'label': 'Location', 'value': 'Kitchen'}
    ]
    
    for i, detail in enumerate(details):
        y_pos = 190 + i*35
        d.append(draw.Text(detail['label'], 14, 40, y_pos, fill=LIGHT_TEXT_COLOR))
        d.append(draw.Text(detail['value'], 16, IPHONE_WIDTH-60, y_pos, 
                          text_anchor='end', fill=TEXT_COLOR, font_weight='bold'))
    
    # Notes section
    d.append(draw.Text('Notes', 18, 30, 390, fill=TEXT_COLOR, font_weight='bold'))
    d.append(draw.Rectangle(20, 410, IPHONE_WIDTH-40, 100, rx=10, ry=10, fill='white'))
    d.append(draw.Text('Remember to check if we need to buy more pasta.', 
                      16, 40, 440, fill=TEXT_COLOR))
    
    # Action buttons
    button_width = (IPHONE_WIDTH-60) / 2
    
    # Complete button
    d.append(draw.Rectangle(20, 540, button_width, 50, rx=25, ry=25, fill=SUCCESS_COLOR))
    d.append(draw.Text('Complete', 16, 20 + button_width/2, 570, 
                      text_anchor='middle', fill='white', font_weight='bold'))
    
    # Reassign button
    d.append(draw.Rectangle(40 + button_width, 540, button_width, 50, rx=25, ry=25, fill=PRIMARY_COLOR))
    d.append(draw.Text('Reassign', 16, 40 + button_width + button_width/2, 570, 
                      text_anchor='middle', fill='white', font_weight='bold'))
    
    # Delete button
    d.append(draw.Rectangle(20, 610, IPHONE_WIDTH-40, 50, rx=25, ry=25, 
                           fill='white', stroke=DANGER_COLOR, stroke_width=2))
    d.append(draw.Text('Delete Task', 16, IPHONE_WIDTH/2, 640, 
                      text_anchor='middle', fill=DANGER_COLOR, font_weight='bold'))
    
    d.save_svg('/home/ubuntu/household_app/design/mockups/task_detail_screen.svg')
    return d

def create_calendar_screen():
    """Create calendar screen mockup"""
    d = create_iphone_frame('Calendar')
    
    # Month selector
    d.append(draw.Rectangle(0, 110, IPHONE_WIDTH, 50, fill='white'))
    d.append(draw.Text('< March 2025 >', 18, IPHONE_WIDTH/2, 140, 
                      text_anchor='middle', fill=TEXT_COLOR, font_weight='bold'))
    
    # Calendar grid
    calendar_width = IPHONE_WIDTH-40
    d.append(draw.Rectangle(20, 170, calendar_width, 300, rx=10, ry=10, fill='white'))
    
    # Days of week header
    days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
    day_width = calendar_width / 7
    
    for i, day in enumerate(days):
        x_pos = 20 + i * day_width + day_width/2
        d.append(draw.Text(day, 14, x_pos, 195, text_anchor='middle', fill=LIGHT_TEXT_COLOR))
    
    # Calendar dates
    dates = [
        [24, 25, 26, 27, 28, 1, 2],
        [3, 4, 5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14, 15, 16],
        [17, 18, 19, 20, 21, 22, 23],
        [24, 25, 26, 27, 28, 29, 30],
        [31, 1, 2, 3, 4, 5, 6]
    ]
    
    for row, week in enumerate(dates):
        for col, date in enumerate(week):
            x_pos = 20 + col * day_width + day_width/2
            y_pos = 230 + row * 40
            
            # Highlight current day
            if row == 3 and col == 2:  # March 20th in this example
                d.append(draw.Circle(x_pos, y_pos, 15, fill=PRIMARY_COLOR))
                d.append(draw.Text(str(date), 14, x_pos, y_pos+5, 
                                  text_anchor='middle', fill='white'))
            else:
                # Gray out dates not in current month
                text_color = LIGHT_TEXT_COLOR if (row == 0 and col < 5) or (row == 5 and col > 0) else TEXT_COLOR
                d.append(draw.Text(str(date), 14, x_pos, y_pos+5, 
                                  text_anchor='middle', fill=text_color))
            
            # Task indicators
            if (row == 3 and col in [0, 2, 4]) or (row == 2 and col in [1, 5]):
                dot_color = PRIMARY_COLOR
                if (row == 3 and col == 0) or (row == 2 and col == 5):
                    dot_color = SECONDARY_COLOR
                
                d.append(draw.Circle(x_pos, y_pos+15, 3, fill=dot_color))
    
    # Today's schedule
    d.append(draw.Text('March 20 Schedule', 18, 30, 490, fill=TEXT_COLOR, font_weight='bold'))
    
    # Schedule timeline
    timeline_tasks = [
        {'time': '6:00 PM', 'title': 'Prepare Dinner', 'assigned': 'You', 'color': PRIMARY_COLOR},
        {'time': '8:00 PM', 'title': 'Laundry', 'assigned': 'You', 'color': SECONDARY_COLOR},
    ]
    
    for i, task in enumerate(timeline_tasks):
        y_pos = 510 + i*80
        # Time
        d.append(draw.Text(task['time'], 14, 30, y_pos+15, fill=LIGHT_TEXT_COLOR))
        
        # Task card
        d.append(draw.Rectangle(90, y_pos, IPHONE_WIDTH-110, 60, rx=8, ry=8, fill='white'))
        d.append(draw.Rectangle(90, y_pos, 8, 60, rx=4, ry=4, fill=task['color']))
        
        # Task details
        d.append(draw.Text(task['title'], 16, 110, y_pos+25, fill=TEXT_COLOR, font_weight='bold'))
        d.append(draw.Text(task['assigned'], 14, 110, y_pos+45, fill=LIGHT_TEXT_COLOR))
    
    d.save_svg('/home/ubuntu/household_app/design/mockups/calendar_screen.svg')
    return d

def create_add_task_screen():
    """Create add task screen mockup"""
    d = create_iphone_frame('Add New Task')
    
    # Close button
    d.append(draw.Text('Cancel', 16, 30, 74, fill=PRIMARY_COLOR))
    
    # Form fields
    fields = [
        {'label': 'Task Name', 'placeholder': 'Enter task name', 'type': 'text'},
        {'label': 'Assigned To', 'placeholder': 'Select person', 'type': 'select'},
        {'label': 'Date', 'placeholder': 'Select date', 'type': 'date'},
        {'label': 'Time', 'placeholder': 'Select time', 'type': 'time'},
        {'label': 'Repeat', 'placeholder': 'Never', 'type': 'select'},
        {'label': 'Location', '<response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>