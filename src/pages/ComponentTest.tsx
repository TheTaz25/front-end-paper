import { Center } from "@mantine/core";
import ScrollSnapContainer from "../components/ScrollSnapContainer";
import ScrollSnapElement from "../components/ScrollSnapElement";

const ComponentTestPage: React.FC = () => {
  return <ScrollSnapContainer direction="y" snapType="mandatory" style={{ height: '100%' }}>
    <ScrollSnapElement align="start" style={{ height: '100%' }}>
      <Center h="100%">
        Test!?
      </Center>
    </ScrollSnapElement>
    <ScrollSnapElement align="start" style={{ height: '100%', backgroundColor: 'lightblue' }}>
      Test123123
    </ScrollSnapElement>
    <ScrollSnapElement align="start" style={{ height: '100%' }}>
      Henlo Werld
    </ScrollSnapElement>
  </ScrollSnapContainer>
}

export default ComponentTestPage;
