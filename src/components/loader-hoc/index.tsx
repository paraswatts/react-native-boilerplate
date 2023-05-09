import { MainState } from "@services/redux/RootReducer";
import React, { FC } from "react";
import { View, ActivityIndicator, Text, StyleSheet, ViewStyle } from "react-native";
import { useSelector } from "react-redux";

interface ILoaderHOCProps {
    children: JSX.Element;
}
const LoaderHOC: FC<ILoaderHOCProps> = ({ children }) => {
    const loading = useSelector(
        (state: MainState) => state.user.loading as boolean,
    );
    const styles = createStyles();

    return (
        <>
            {children}
            {!!loading && (
                <View
                    style={styles.container}
                >
                    <ActivityIndicator color="white" size="large" />
                </View>
            )}
        </>
    );
};


interface Style {
    container: ViewStyle;
}

const createStyles = () => {
    return StyleSheet.create<Style>({
        container: {
            zIndex: 9999999,
            position: "absolute",
            top: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            left: 0,
            right: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
        },
    })
};
export default LoaderHOC;
