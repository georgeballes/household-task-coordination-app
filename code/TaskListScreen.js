import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTaskContext } from '../context/TaskContext';

const TaskListScreen = ({ navigation }) => {
  const { 
    tasks, 
    getCurrentUserTasks, 
    getSharedTasks,
    toggleTaskCompletion 
  } = useTaskContext();
  
  const [activeTab, setActiveTab] = useState('All');
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    // Update filtered tasks when tab changes
    if (activeTab === 'All') {
      setFilteredTasks(tasks);
    } else if (activeTab === 'Mine') {
      setFilteredTasks(getCurrentUserTasks());
    } else if (activeTab === 'Shared') {
      setFilteredTasks(getSharedTasks());
    }
  }, [activeTab, tasks]);

  const handleTaskPress = (taskId) => {
    navigation.navigate('TaskDetail', { taskId });
  };

  const handleAddTask = () => {
    navigation.navigate('AddTask');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Filter Tabs */}
      <View style={styles.tabContainer}>
        {['All', 'Mine', 'Shared'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab && styles.activeTabText
            ]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scrollView}>
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TouchableOpacity 
              key={task.id} 
              style={[
                styles.taskCard,
                task.completed && styles.completedTaskCard
              ]}
              onPress={() => handleTaskPress(task.id)}
            >
              <View style={styles.taskContent}>
                <Text style={[
                  styles.taskTitle,
                  task.completed && styles.completedTaskTitle
                ]}>{task.title}</Text>
                <Text style={styles.taskDetails}>
                  {task.assignedTo} • {task.day} {task.time}
                </Text>
              </View>
              <TouchableOpacity 
                style={styles.checkboxContainer}
                onPress={() => toggleTaskCompletion(task.id)}
              >
                <View style={[
                  styles.checkbox, 
                  task.completed && styles.checkboxChecked
                ]}>
                  {task.completed && (
                    <Ionicons name="checkmark" size={18} color="white" />
                  )}
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tasks found</Text>
          </View>
        )}
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 50,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#4A80F0',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  activeTabText: {
    color: 'white',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  taskCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    marginBottom: 15,
    height: 80,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  completedTaskCard: {
    backgroundColor: '#F0F0F0',
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  completedTaskTitle: {
    color: '#777777',
    textDecorationLine: 'line-through',
  },
  taskDetails: {
    fontSize: 14,
    color: '#777777',
  },
  checkboxContainer: {
    padding: 10,
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
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#777777',
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

export default TaskListScreen;
