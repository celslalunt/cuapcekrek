// import {
//   Flex,
//   Stack
//   Box,
//   FormControl,
//   FormLabel,
//   Input,
//   InputGroup,
//   InputRightElement,
//   Stack,
//   Button,
//   Heading,
//   Text,
//   useColorModeValue,
//   Link,
// } from "@chakra-ui/react";
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';


// const EditProfile = () => {
//   const [fullName, setFullName] = useState('');
//   const [bio, setBio] = useState('');
//   const [username, setUsername] = useState('');

//   useEffect(() => {
//     // Fetch user data from the server
//     axios.get('/api/user')
//       .then(response => {
//         const { fullName, bio } = response.data;
//         setFullName(fullName);
//         setBio(bio);
//       })
//       .catch(error => {
//         console.error('Error fetching user data:', error);
//       });
//   }, []);

//   const handleFormSubmit = (e) => {
//     e.preventDefault();

//     // Send updated user data to the server
//     axios.put('/api/user', { fullName, bio, username })
//       .then(response => {
//         console.log('User data updated successfully');
//       })
//       .catch(error => {
//         console.error('Error updating user data:', error);
//       });
//   };

// return (
//         <Flex
//             minH={"100vh"}
//             align={"center"}
//             justify={"center"}
//             bg={useColorModeValue("pink.100", "gray.800")}
//         >
//             <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6} w={500}>
//                 <Stack align={"center"}>
//                     <Heading fontSize={"4xl"} textAlign={"center"}>
//                         Edit Profile
//                     </Heading>
//                 </Stack>
//                 <Form onSubmit={handleFormSubmit}>
//                 </Form>
//                 <Box
//                     rounded={"lg"}
//                     bg={useColorModeValue("white", "purple.700")}
//                     boxShadow={"lg"}
//                     p={8}
                    
//                 >
//                     <Stack spacing={4}>
//                         <FormControl id="fullName" isRequired>
//                             <FormLabel>Full Name</FormLabel>
//                             <Input 
//                             type="text"
//                             value={fullName}
//                             onChange={e => setFullName(e.target.value)}
//                             borderColor="pink.700"
//                             focusBorderColor="pink.900" />
//                         </FormControl>
//                         <FormControl id="bio" isRequired>
//                             <FormLabel>Bio</FormLabel>
//                             <Input 
//                             type="text"
//                             value={bio}
//                             onChange={e => setBio(e.target.value)}
//                             borderColor="pink.700"
//                             focusBorderColor="pink.900"/>
//                         </FormControl>
//                         <Stack spacing={10} pt={2}>
//                             <Button
//                                 loadingText="Submitting"
//                                 size="lg"
//                                 bgColor="pink.600"
//                                 color="white"
//                                 variant="solid"
//                                 onClick={onRegister}
//                             >
//                                 Sign Up!
//                             </Button>
//                         </Stack>
//                         <Stack pt={6}>
//                             <Text align={"center"}>
//                                 <Link
//                                     color={"pink.400"}
//                                     onClick={() => navigate("/")}
//                                 >
//                                     Back to CuapCekrek Home Page
//                                 </Link>
//                             </Text>
//                         </Stack>
//                     </Stack>
//                 </Box>
//             </Stack>
//         </Flex>
//     );