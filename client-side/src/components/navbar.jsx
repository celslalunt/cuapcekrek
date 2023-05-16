import {
    Button,
    Flex,
    VStack,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Avatar,
} from "@chakra-ui/react";
import { Image } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

//assets
import logo from "../assets/logo.png";

//importan redux
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";

export const Navbar = () => {
    const { username } = useSelector(
        (state) => state.userSlice.value
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const onSignOut = () => {
        dispatch(logout());
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <VStack
            justify="space-evenly"
            align="flex-end"
            shadow="base"
            bgColor="pink.100"
            w="100vw"
            h="16"
        >
            <Flex align="center" className="mr-auto ml-4">
                <Link class="navbar-brand" to="/">
                    <Image src={logo} alt="icon" className="icon-logo" />
                </Link>
                <Flex align="center" ml={"820"}>
                    {token ? (
                        <>
                            <Menu>
                                <Avatar
                                    as={MenuButton}
                                    mr="4"
                                    name={username}
                                    size="md"
                                    bg="pink.800"
                                    textColor="white"
                                />
                                <MenuList>
                                    <MenuItem
                                        onClick={() => navigate("/profile")}
                                    >
                                        My Profile
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => navigate("/editProfile")}
                                    >
                                        Edit Profile
                                    </MenuItem>
                                    <MenuItem onClick={onSignOut}>
                                        Sign Out
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                            <Text as="b">Welcome, {username}</Text>
                        </>
                    ) : (
                        <>
                            <Button
                                onClick={() => navigate("/login")}
                                rounded={"full"}
                                bgColor="pink.900"
                                color="white"
                                variant="solid"
                                mr="2"
                            >
                                Login Account
                            </Button>
                            <Button
                                mr="2"
                                rounded={"full"}
                                bgColor="black"
                                color="white"
                                onClick={() => navigate("/register")}
                            >
                                Create Account
                            </Button>
                        </>
                    )}
                </Flex>
            </Flex>
        </VStack>
    );
};
