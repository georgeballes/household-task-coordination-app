import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTaskContext } from '../context/TaskContext';

const TaskDetailScreen = ({ route, navigation }) => {
  const { taskId } = route.params || { taskId: 1 };
  const { 
    getTaskById, 
    members, 
    updateTask, 
    deleteTask, 
    toggleTaskCompletion,
    reassignTask
  } = useTaskContext();
  
  const [task, setTask] = useState(null);
  const [showReassignOptions, setShowReassignOptions] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    // Get task details from context
    const taskData = getTaskById(taskId);
    setTask(taskData);
    
    // Find the currently assigned member
    const currentAssignee = taskData.assignedTo === 'You' ? 'You (Alex)' : taskData.assignedTo;
    setSelectedMember(members.find(m => m.name === currentAssignee));
  }, [taskId]);

  const handleComplete = () => {
    toggleTaskCompletion(taskId);
    Alert.alert('Success', 'Task marked as complete!');
    setTimeout(() => {
      navigation.goBack();
    }, 1000);
  };

  const handleReassign = () => {
    // Show reassignment options
    setShowReassignOptions(!showReassignOptions);
  };

  const assignToMember = (member) => {
    // Update selected member
    setSelectedMember(member);
    setShowReassignOptions(false);
    
    // Update task assignment in context
    const assigneeName = member.name.includes('You') ? 'You' : member.name;
    reassignTask(taskId, assigneeName);
    
    // Update local state
    setTask({...task, assignedTo: assigneeName});
    
    Alert.alert('Success', `Task reassigned to ${assigneeName}!`);
  };

  const handleDelete = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            deleteTask(taskId);
            navigation.goBack();
          },
          style: 'destructive',
        },
      ]
    );
  };

  if (!task) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Loading task details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Task Title */}
        <Text style={styles.taskTitle}>{task.title}</Text>
        
        {/* Task Details Card */}
        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Assigned to</Text>
            <Text style={styles.detailValue}>{task.assignedTo}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date</Text>
            <Text style={styles.detailValue}>{task.day}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Time</Text>
            <Text style={styles.detailValue}>{task.time}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Repeats</Text>
            <Text style={styles.detailValue}>Every Monday, Wednesday</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Location</Text>
            <Text style={styles.detailValue}>Kitchen</Text>
          </View>
        </View>
        
        {/* Notes Section */}
        <Text style={styles.sectionTitle}>Notes</Text>
        <View style={styles.notesCard}>
          <Text style={styles.notesText}>{task.notes}</Text>
        </View>
        
        {/* Reassign Options */}
        {showReassignOptions && (
          <View style={styles.reassignCard}>
            <Text style={styles.reassignTitle}>Reassign to:</Text>
            {members.map(member => (
              <TouchableOpacity 
                key={member.id} 
                style={[
                  styles.memberOption,
                  selectedMember && selectedMember.id === member.id && styles.selectedMember
                ]}
                onPress={() => assignToMember(member)}
              >
                <Text style={[
                  styles.memberName,
                  selectedMember && selectedMember.id === member.id && styles.selectedMemberName
                ]}>{member.name}</Text>
                {selectedMember && selectedMember.id === member.id && (
                  <Ionicons name="checkmark" size={20} color="white" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
        
        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.completeButton]}
            onPress={handleComplete}
          >
            <Text style={styles.actionButtonText}>Complete</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.reassignButton]}
            onPress={handleReassign}
          >
            <Text style={styles.actionButtonText}>Reassign</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={handleDelete}
        >
          <Text style={styles.deleteButtonText}>Delete Task</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  taskTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginVertical: 20,
  },
  detailsCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  detailLabel: {
    fontSize: 16,
    color: '#777777',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  notesCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  notesText: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
  },
  reassignCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  reassignTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  memberOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedMember: {
    backgroundColor: '#4A80F0',
  },
  memberName: {
    fontSize: 16,
    color: '#333333',
  },
  selectedMemberName: {
    color: 'white',
    fontWeight: 'bold',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  completeButton: {
    backgroundColor: '#4CAF50',
  },
  reassignButton: {
    backgroundColor: '#4A80F0',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#F44336',
    marginBottom: 30,
  },
  deleteButtonText: {
    color: '#F44336',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TaskDetailScreen;
