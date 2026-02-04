import {

    VStack,
    HStack,
    Checkbox,
    IconButton,
    Text,
  } from "@chakra-ui/react";
  import { FaTrash } from "react-icons/fa";
import axios from 'axios';
import { API } from '../../helpers/constants';
import { useSelector } from 'react-redux';

export function Notelist({getTasks}) {

  const notelist = useSelector((store) => store.note.list);

console.log("notelist", notelist);

      // Toggle Task Completion
  const toggleTask = (id) => {
    axios.patch(`${API}/todo?id=`+id, { completed: true}).then((data)=>{
      getTasks()
    })
  };

  // Delete Task
  const deleteTask = (id) => {
    axios.delete(`${API}/todo?id=`+id).then((data)=>{
      console.log("deleteTask", data,notelist, id );
      getTasks()
      // setNotes(notelist.filter((task) => task._id !== id));
    })
  };

  return (
    <VStack mt={4} align="stretch">
    {!notelist.isCompleted?.length && !notelist.notCompleted?.length? (
      <Text textAlign="center" color="gray.500">
        No note yet!
      </Text>
    ) : (
      <>
        {notelist.notCompleted.map((task) => (
          <HStack
            key={task.id}
            p={3}
            bg="gray.800"
            borderRadius="md"
            boxShadow="sm"
            justifyContent="space-between"
          >
            <Checkbox.Root
              isChecked={task.completed}
              onChange={() => toggleTask(task._id)}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label as={task.completed ? "del" : ""}>
                {task.text}
              </Checkbox.Label>
            </Checkbox.Root>

            <IconButton
              colorScheme="dark"
              size="sm"
              onClick={() => deleteTask(task._id)}
            >
              <FaTrash />
            </IconButton>
          </HStack>
        ))}
        <hr/>
         {notelist.isCompleted.map((task) => (
          <HStack
            key={task.id}
            p={3}
            bg="gray.800"
            borderRadius="md"
            boxShadow="sm"
            justifyContent="space-between"
          >
            <Checkbox.Root
              isChecked={task.completed}
              onChange={() => toggleTask(task._id)}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label as={task.completed ? "del" : ""}>
                {task.text}
              </Checkbox.Label>
            </Checkbox.Root>

            <IconButton
              colorScheme="dark"
              size="sm"
              onClick={() => deleteTask(task._id)}
            >
              <FaTrash />
            </IconButton>
          </HStack>
        ))}
      </>
    )}
  </VStack>
  )
}

