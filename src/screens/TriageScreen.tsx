
import { View } from "react-native";
import TriageForm from "../components/triageForm";

export default function TriageScreen() {

    const handleSubmit = (data: any) => {
        console.log("Form submitted with data:", data);
    };

    return (
        <View style={{flex:1}}>
            <TriageForm onSubmit={handleSubmit}/>
        </View>
    );
}