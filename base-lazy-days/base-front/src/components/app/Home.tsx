import { Icon, Stack, Text } from '@chakra-ui/react';
import BackgroundImage from 'components/common/BackgroundImage';
import { ReactElement } from 'react';
import { GiFlowerPot } from 'react-icons/gi';

export function Home(): ReactElement {
  return (
    <Stack align="center" justify="center" height="84vh">
      <BackgroundImage />
      <Text textAlign="center" fontFamily="Forum, sans-serif" fontSize="6em">
        <Icon m={4} verticalAlign="top" as={GiFlowerPot} />
        Lazy Days Spa
      </Text>
      <Text>Hours: limited</Text>
      <Text>Address: nearby</Text>
    </Stack>
  );
}
