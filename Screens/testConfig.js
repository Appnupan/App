import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
// import "./firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function TestConfig() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // 에러 메시지를 저장할 상태

    const auth = getAuth();

    const createUser = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // 성공적으로 사용자가 생성되면 실행될 코드
                const user = userCredential.user;
                Alert.alert("Success", "User Created Successfully: " + user.email);
                // 사용자 생성 후 필요한 로직을 여기에 추가
            })
            .catch((error) => {
                // 에러 발생 시 실행될 코드
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage); // 에러 메시지 상태 업데이트
                Alert.alert("Error", errorMessage); // 사용자에게 에러 메시지 표시
            });
    };

    return (
        <View style={styles.container}>
            <Text>Email</Text>
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
            />
            <Text>Password</Text>
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
            />
            {error !== "" && <Text style={styles.errorText}>{error}</Text>}
            <Button title="Sign Up!" onPress={createUser} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    errorText: {
        color: 'red',
    },
});
