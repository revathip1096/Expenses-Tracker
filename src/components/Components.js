import React, { useState } from 'react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  ChakraProvider,
  Center,
  Container,
  Heading,
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  HStack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';

function Components() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState({
    en: '',
    rate: '',
  });
  const [expenses, setExpenses] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // Track the index of the item being edited

  const onClose = () => {
    setIsOpen(false);
    setInputValue({
      en: '',
      rate: '',
    });
    setEditIndex(null); // Reset the edit index
  };

  const onOpen = () => setIsOpen(true);

  const handleSave = () => {
    if (editIndex !== null) {
      // If editIndex is not null, update the existing expense
      const updatedExpenses = [...expenses];
      updatedExpenses[editIndex] = {
        en: inputValue.en,
        rate: parseFloat(inputValue.rate),
      };
      setExpenses(updatedExpenses);
    } else {
      // Otherwise, add a new expense
      const newExpense = {
        en: inputValue.en,
        rate: parseFloat(inputValue.rate),
      };
      setExpenses([...expenses, newExpense]);
    }
    onClose();
  };

  const editexp = (idx) => {
    // Set the edit index and populate the input fields with the selected expense
    setEditIndex(idx);
    setInputValue(expenses[idx]);
    onOpen();
  };

  const deletexp = (idx) => {
    const updatedExpenses = expenses.filter((_, id) => id !== idx);
    setExpenses(updatedExpenses);
  };

  const getTotalExpense = () => {
    // Calculate the total expense by summing up the 'rate' property of each expense
    return expenses.reduce((total, expense) => total + expense.rate, 0);
  };

  return (
    <div>
      <Box>
        <Center h="60vh">
          <Container>
            <Center>
              <Heading>Expenses Tracker</Heading>
            </Center>
            <Center>
              <Button
                variant="solid"
                size="md"
                bg="blue"
                mt="40px"
                onClick={onOpen}
              >
                Add Expense
              </Button>

                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader w="180">
                      {editIndex !== null ? 'Edit Expense' : 'Add Expense'}
                    </ModalHeader>
                    <ModalCloseButton />
                    <HStack>
                      <ModalBody>
                        <Input
                          w="160"
                          placeholder="Enter the expense"
                          value={inputValue.en}
                          onChange={(e) =>
                            setInputValue({ ...inputValue, en: e.target.value })
                          }
                        />
                      </ModalBody>
                      <Input
                        w="70"
                        mr="22"
                        placeholder="Enter the amount"
                        value={inputValue.rate}
                        onChange={(e) =>
                          setInputValue({
                            ...inputValue,
                            rate: e.target.value,
                          })
                        }
                      />
                    </HStack>
                    <ModalFooter>
                      
                      <Button colorScheme="green" onClick={handleSave}>
                        Save
                      </Button>
                      
                    </ModalFooter>
                  </ModalContent>
                </Modal>
            </Center>
          </Container>
        </Center>
      </Box>
      {expenses.length !== 0 ? (
        <TableContainer px="30" mx="250">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name of the Expense</Th>
                <Th isNumeric>Amount</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {expenses.map((expense, idx) => (
                <Tr key={idx}>
                  <Td>{expense.en}</Td>
                  <Td isNumeric>{expense.rate}</Td>
                  <Td>
                    <HStack>
                      <EditIcon onClick={() => editexp(idx)} />
                      <DeleteIcon onClick={() => deletexp(idx)} />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Total</Th>
                <Th isNumeric>{getTotalExpense()}</Th>
                <Th></Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      ) : (
        ''
      )}
    </div>
  );
}

export default Components;
