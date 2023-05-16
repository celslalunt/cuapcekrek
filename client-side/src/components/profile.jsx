import React from "react";
import {
    Container,
    SimpleGrid,
    Image,
    Flex,
    Heading,
    Text,
    Stack,
    StackDivider,
    useColorModeValue,
    Link,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
//importan redux
import { useSelector } from "react-redux";

import profile from "../assets/profile.jpg"

const Feature = ({ text, icon, iconBg }) => {
    return (
        <Stack direction={"row"} align={"center"}>
            <Flex
                w={8}
                h={8}
                align={"center"}
                justify={"center"}
                rounded={"full"}
                bg={iconBg}
            >
                {icon}
            </Flex>
            <Text fontWeight={600}>{text}</Text>
        </Stack>
    );
};

function Profile() {
    const navigate = useNavigate();

    const { username, phone_number, email} = useSelector(
        (state) => state.userSlice.value
    );
    return (
        <Container maxW={"5xl"} py={12}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <Stack spacing={4}>
                    <Heading>Your Profile</Heading>
                    <Text color={"gray.500"} fontSize={"lg"}>
                    </Text>
                    <Stack
                        spacing={4}
                        divider={
                            <StackDivider
                                borderColor={useColorModeValue(
                                    "gray.100",
                                    "gray.700"
                                )}
                            />
                        }
                    >
                        <Feature text={`Username: ${username}`} />
                        <Feature text={`Phone number: ${phone_number}`} />
                        <Feature text={`Email: ${email}`} />
                        <Link color={"pink.400"} onClick={() => navigate("/")}>
                            Back to Home
                        </Link>
                    </Stack>
                </Stack>
                <Flex>
                    <Image
                        rounded={"md"}
                        alt={"feature image"}
                        src={profile}
                        objectFit={"cover"}
                    />
                </Flex>
            </SimpleGrid>
        </Container>
    );
}

export default Profile;

