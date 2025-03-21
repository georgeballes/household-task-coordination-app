import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTaskContext } from '../context/TaskContext';

const HomeScreen = ({ navigation }) => {
  const { 
    tasks, 
    members, 
    currentUser, 
    toggleTaskCompletion,
    addMember
  } = useTaskContext();
  
  // Filter today's tasks
  const todaysTasks = tasks.filter(task => task.day === 'Today' && !task.completed);
  
  const [upcomingDays, setUpcomingDays] = useState([
    { day: 'M', date: 20, hasTask: true, isToday: false },
    { day: 'T', date: 21, hasTask: false, isToday: false },
    { day: 'W', date: 22, hasTask: true, isToday: true },
    { day: 'T', date: 23, hasTask: false, isToday: false },
    { day: 'F', date: 24, hasTask: true, isToday: false },
    { day: 'S', date: 25, hasTask: false, isToday: false },
    { day: 'S', date: 26, hasTask: false, isToday: false },
  ]);

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

  const handleAddMember = () => {
    // In a real app, we would show a modal to enter member details
    // For the prototype, we'll just add a hardcoded new member
    addMember('New Member');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Welcome Section */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>Welcome back, {currentUser.name.split(' ')[0]}!</Text>
          <Text style={styles.welcomeSubtitle}>
            You have {todaysTasks.length} tasks today
          </Text>
        </View>

        {/* Today's Tasks Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Today's Tasks</Text>
          
          {todaysTasks.length > 0 ? (
            todaysTasks.map(task => (
              <TouchableOpacity 
                key={task.id} 
                style={styles.taskCard}
                onPress={() => handleTaskPress(task.id)}
              >
                <View style={[styles.taskIndicator, { backgroundColor: task.color }]} />
                <View style={styles.taskContent}>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  <Text style={styles.taskDetails}>
                    {task.assignedTo} • {task.time}
                  </Text>
                </View>
                <TouchableOpacity 
                  style={styles.checkboxContainer}
                  onPress={() => toggleTaskCompletion(task.id)}
                >
                  <View style={styles.checkbox}>
                    {task.completed && (
                      <Ionicons name="checkmark" size={18} color="white" />
                    )}
                  </View>
                </TouchableOpacity>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyTasksContainer}>
              <Text style={styles.emptyTasksText}>No tasks for today</Text>
              <TouchableOpacity 
                style={styles.addTaskButton}
                onPress={handleAddTask}
              >
                <Text style={styles.addTaskButtonText}>Add Task</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Household Members Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Household Members</Text>
          <View style={styles.membersContainer}>
            {members.map((member, index) => (
              <View key={index} style={styles.memberItem}>
                <View style={styles.memberAvatar}>
                  <Text style={styles.memberInitial}>{member.avatar}</Text>
                </View>
                <Text style={styles.memberName}>{member.name.includes('You') ? 'You' : member.name}</Text>
              </View>
            ))}
            <TouchableOpacity 
              style={styles.addMemberButton}
              onPress={handleAddMember}
            >
              <Ionicons name="add" size={24} color="#4A80F0" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Upcoming Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Upcoming</Text>
          <View style={styles.calendarPreview}>
            <View style={styles.daysRow}>
              {upcomingDays.map((day, index) => (
                <View key={index} style={styles.dayColumn}>
                  <Text style={styles.dayText}>{day.day}</Text>
                  <View style={[
                    styles.dateCircle,
                    day.isToday && styles.todayCircle
                  ]}>
                    <Text style={[
                      styles.dateText,
                      day.isToday && styles.todayText
                    ]}>{day.date}</Text>
                  </View>
                  {day.hasTask && (
                    <View style={styles.taskIndicatorDot} />
                  )}
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Quick Add Button */}
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
    padding: 20,
  },
  welcomeCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#777777',
  },
  sectionContainer: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  taskCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    marginBottom: 10,
    height: 80,
    alignItems: 'center',
  },
  taskIndicator: {
    width: 10,
    height: 80,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  taskContent: {
    flex: 1,
    paddingHorizontal: 15,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  taskDetails: {
    fontSize: 14,
    color: '#777777',
  },
  checkboxContainer: {
    padding: 15,
  },
  checkbox: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#777777',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  emptyTasksContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  emptyTasksText: {
    fontSize: 16,
    color: '#777777',
    marginBottom: 10,
  },
  addTaskButton: {
    backgroundColor: '#4A80F0',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  addTaskButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  membersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  memberItem: {
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 10,
  },
  memberAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4A80F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  memberInitial: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  memberName: {
    fontSize: 14,
    color: '#333333',
  },
  addMemberButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#4A80F0',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  calendarPreview: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  dayColumn: {
    alignItems: 'center',
    width: 40,
  },
  dayText: {
    fontSize: 14,
    color: '#777777',
    marginBottom: 10,
  },
  dateCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  todayCircle: {
    backgroundColor: '#4A80F0',
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  todayText: {
    color: 'white',
  },
  taskIndicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F5A623',
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

export default HomeScreen;
