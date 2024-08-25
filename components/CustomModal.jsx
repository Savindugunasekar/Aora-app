import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomModal = ({ visible, onCancel, onDelete }) => (
  <Modal
    transparent={true}
    animationType="fade"
    visible={visible}
    
  >
    <View style={styles.modalBackground}>
      <View style={styles.modalView}>
        <Text style={styles.title}>Delete video?</Text>
        <Text style={styles.message}>This will delete the video permanently.</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onCancel} style={styles.button}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete} style={styles.button}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  modalView: {
    margin: 20,
    backgroundColor: '#262633',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color:'#FF9C01'
  },
  message: {
    marginVertical: 15,
    textAlign: 'center',
    fontSize:15,
    color:'white'

  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelText: {
    color: 'white',
    fontSize:20
  },
  deleteText: {
    color: 'red',
    fontSize:20
  },
});

export default CustomModal;
