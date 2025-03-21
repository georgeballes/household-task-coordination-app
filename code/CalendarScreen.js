import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { useTaskContext } from '../context/TaskContext';

const CalendarScreen = ({ navigation }) => {
  const { tasks, getTasksByDate } = useTaskContext();
  const [selectedDate, setSelectedDate] = useState('2025-03-20');
  const [markedDates, setMarkedDates] = useState({});
  const [scheduledTasks, setScheduledTasks] = useState([]);
  
  useEffect(() => {
    // Generate marked dates from tasks
    const marks = {};
    tasks.forEach(task => {
      // In a real app, we would convert task.day to a date string
      // For the prototype, we'll use hardcoded dates
      let dateString = '2025-03-20'; // Default to today
      
      if (task.day === 'Today') {
        dateString = '2025-03-20';
      } else if (task.day === 'Tomorrow') {
        dateString = '2025-03-21';
      } else if (task.day === 'Yesterday') {
        dateString = '2025-03-19';
      } else if (task.day === 'Wed') {
        dateString = '2025-03-22';
      }
      
      marks[dateString] = {
        ...(marks[dateString] || {}),
        marked: true,
        dotColor: task.color || '#4A80F0'
      };
      
      // Add selected property to the selected date
      if (dateString === selectedDate) {
        marks[dateString] = {
          ...marks[dateString],
          selected: true,
          selectedColor: '#4A80F0'
        };
      }
    });
    
    setMarkedDates(marks);
    
    // Get tasks for selected date
    setScheduledTasks(getTasksByDate(selectedDate));
  }, [selectedDate, tasks]);

  const handleDayPress = (day) => {
    // Update selected date
    setSelectedDate(day.dateString);
  };

  const handleTaskPress = (taskId) => {
    navigation.navigate('Tasks', {
      screen: 'TaskDetail',
      params: { taskId },
    });
  };

  const handleAddTask = () => {
    navigation.navigate('Tasks', {
      screen: 'AddTask',
    });
  };

  // Format date for display (e.g., "March 20")
  const formatDisplayDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Calendar */}
        <View style={styles.calendarContainer}>
          <Calendar
            markedDates={markedDates}
            onDayPress={handleDayPress}
            theme={{
              calendarBackground: 'white',
              textSectionTitleColor: '#777777',
              selectedDayBackgroundColor: '#4A80F0',
              selectedDayTextColor: 'white',
              todayTextColor: '#4A80F0',
              dayTextColor: '#333333',
              textDisabledColor: '#d9e1e8',
              dotColor: '#4A80F0',
              selectedDotColor: 'white',
              arrowColor: '#4A80F0',
              monthTextColor: '#333333',
              indicatorColor: '#4A80F0',
              textDayFontWeight: '300',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '300',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 14
            }}
          />
        </View>
        
        {/* Schedule for selected date */}
        <View style={styles.scheduleContainer}>
          <Text style={styles.scheduleTitle}>
            {formatDisplayDate(selectedDate)} Schedule
          </Text>
          
          {scheduledTasks.length > 0 ? (
            scheduledTasks.map(task => (
              <View key={task.id} style={styles.timelineItem}>
                <View style={styles.timeContainer}>
                  <Text style={styles.timeText}>{task.time}</Text>
                </View>
                
                <TouchableOpacity 
                  style={styles.taskCard}
                  onPress={() => handleTaskPress(task.id)}
                >
                  <View style={[styles.taskIndicator, { backgroundColor: task.color }]} />
                  <View style={styles.taskContent}>
                    <Text style={styles.taskTitle}>{task.title}</Text>
                    <Text style={styles.taskAssignee}>{task.assignedTo}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View style={styles.emptySchedule}>
              <Text style={styles.emptyText}>No tasks scheduled for this day</Text>
              <TouchableOpacity 
                style={styles.addScheduleButton}
                onPress={handleAddTask}
              >
                <Text style={styles.addScheduleButtonText}>Add Task</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
      
      {/* Add Task Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollView: {
    flex: 1,
  },
  calendarContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    overflow: 'hidden',
  },
  scheduleContainer: {
    padding: 20,
  },
  scheduleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timeContainer: {
    width: 60,
    paddingTop: 15,
  },
  timeText: {
    fontSize: 14,
    color: '#777777',
  },
  taskCard: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    height: 60,
    overflow: 'hidden',
  },
  taskIndicator: {
    width: 8,
    height: '100%',
  },
  taskContent: {
    flex: 1,
    padding: 12,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  taskAssignee: {
    fontSize: 14,
    color: '#777777',
  },
  emptySchedule: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#777777',
    marginBottom: 15,
  },
  addScheduleButton: {
    backgroundColor: '#4A80F0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  addScheduleButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4A80F0',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default CalendarScreen;
