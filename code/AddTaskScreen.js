import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTaskContext } from '../context/TaskContext';

const AddTaskScreen = ({ navigation }) => {
  const { members, addTask } = useTaskContext();
  
  const [taskName, setTaskName] = useState('');
  const [assignedTo, setAssignedTo] = useState('You (Alex)');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [repeat, setRepeat] = useState('Never');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  
  const [showAssignOptions, setShowAssignOptions] = useState(false);
  const [showRepeatOptions, setShowRepeatOptions] = useState(false);
  
  const repeatOptions = [
    'Never', 
    'Daily', 
    'Weekdays', 
    'Weekends', 
    'Weekly', 
    'Monthly'
  ];

  const handleSave = () => {
    if (!taskName) {
      Alert.alert('Error', 'Please enter a task name');
      return;
    }
    
    // Format the assigned name (remove "You (" and ")" if present)
    const formattedAssignee = assignedTo.includes('You (') ? 'You' : assignedTo;
    
    // Create new task object
    const newTask = {
      title: taskName,
      assignedTo: formattedAssignee,
      day: date || 'Today',
      time: time || '12:00 PM',
      repeats: repeat,
      location: location,
      notes: notes,
    };
    
    // Add task to context
    const taskId = addTask(newTask);
    
    Alert.alert('Success', 'Task added successfully!');
    
    // Navigate back to task list
    navigation.goBack();
  };
  
  const selectMember = (memberName) => {
    setAssignedTo(memberName);
    setShowAssignOptions(false);
  };
  
  const selectRepeatOption = (option) => {
    setRepeat(option);
    setShowRepeatOptions(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Form Fields */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Task Name</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter task name"
              value={taskName}
              onChangeText={setTaskName}
            />
          </View>
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Assigned To</Text>
          <TouchableOpacity 
            style={styles.inputContainer}
            onPress={() => setShowAssignOptions(!showAssignOptions)}
          >
            <Text style={styles.inputText}>{assignedTo}</Text>
            <Ionicons name="chevron-down" size={20} color="#777777" />
          </TouchableOpacity>
          
          {showAssignOptions && (
            <View style={styles.optionsContainer}>
              {members.map(member => (
                <TouchableOpacity 
                  key={member.id} 
                  style={styles.optionItem}
                  onPress={() => selectMember(member.name)}
                >
                  <Text style={[
                    styles.optionText,
                    assignedTo === member.name && styles.selectedOptionText
                  ]}>{member.name}</Text>
                  {assignedTo === member.name && (
                    <Ionicons name="checkmark" size={20} color="#4A80F0" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Date</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Select date"
              value={date}
              onChangeText={setDate}
            />
            <Ionicons name="calendar" size={20} color="#777777" />
          </View>
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Time</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Select time"
              value={time}
              onChangeText={setTime}
            />
            <Ionicons name="time" size={20} color="#777777" />
          </View>
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Repeat</Text>
          <TouchableOpacity 
            style={styles.inputContainer}
            onPress={() => setShowRepeatOptions(!showRepeatOptions)}
          >
            <Text style={styles.inputText}>{repeat}</Text>
            <Ionicons name="chevron-down" size={20} color="#777777" />
          </TouchableOpacity>
          
          {showRepeatOptions && (
            <View style={styles.optionsContainer}>
              {repeatOptions.map((option, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.optionItem}
                  onPress={() => selectRepeatOption(option)}
                >
                  <Text style={[
                    styles.optionText,
                    repeat === option && styles.selectedOptionText
                  ]}>{option}</Text>
                  {repeat === option && (
                    <Ionicons name="checkmark" size={20} color="#4A80F0" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Location</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Select location"
              value={location}
              onChangeText={setLocation}
            />
            <Ionicons name="location" size={20} color="#777777" />
          </View>
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Notes</Text>
          <View style={[styles.inputContainer, styles.notesInput]}>
            <TextInput
              style={styles.input}
              placeholder="Add notes here..."
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>
        
        {/* Save Button */}
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save Task</Text>
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
  scrollView: {
    flex: 1,
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notesInput: {
    height: 100,
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  inputText: {
    fontSize: 16,
    color: '#333333',
  },
  optionsContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 5,
    padding: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  optionText: {
    fontSize: 16,
    color: '#333333',
  },
  selectedOptionText: {
    color: '#4A80F0',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#4A80F0',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddTaskScreen;
