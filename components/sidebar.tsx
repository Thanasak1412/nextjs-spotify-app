import NextImage from 'next/image';
import NextLink from 'next/link';
import {
  Box,
  List,
  ListItem,
  ListIcon,
  LinkOverlay,
  LinkBox,
  Divider,
  GridItem,
} from '@chakra-ui/layout';
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from 'react-icons/md';
// hooks
import { usePlaylist } from '../lib/hooks';

const navMenu = [
  {
    label: 'Home',
    icon: MdHome,
    link: '/',
  },
  {
    label: 'Search',
    icon: MdSearch,
    link: '/search',
  },
  {
    label: 'Your Library',
    icon: MdLibraryMusic,
    link: '/library',
  },
];

const navMenuItemPlaylist = [
  {
    label: 'Create Playlist',
    icon: MdPlaylistAdd,
    link: '/',
  },
  {
    label: 'Favorites',
    icon: MdFavorite,
    link: 'favorites',
  },
];

type IProps = {
  menu: {
    label: string;
    link: string;
    icon?: any;
  };
};

const NavMenuItem = ({ menu }: IProps) => {
  return (
    <ListItem paddingX={5} fontSize={16}>
      <LinkBox>
        <NextLink href={menu.link} passHref>
          <LinkOverlay>
            {menu?.icon && (
              <ListIcon
                as={menu.icon}
                width="1.25rem"
                height="1.25rem"
                color="white"
                verticalAlign="middle"
                marginRight={3}
              />
            )}
            {menu.label}
          </LinkOverlay>
        </NextLink>
      </LinkBox>
    </ListItem>
  );
};

const Sidebar = () => {
  const { playlists } = usePlaylist();

  return (
    <GridItem colSpan={1} rowSpan={1}>
      <Box
        width="100%"
        height="100%"
        gridColumn="1"
        paddingX="3"
        bgColor="black"
        color="gray"
      >
        <Box
          height="100%"
          display="flex"
          flexDirection="column"
          gap={8}
          paddingY="3"
        >
          <Box width="120px" paddingX="5">
            <NextImage src="/logo.svg" width={120} height={60} alt="icon" />
          </Box>
          <List spacing={2}>
            {navMenu.map((menu) => (
              <NavMenuItem menu={menu} key={menu.label} />
            ))}
          </List>
          <List spacing={2}>
            {navMenuItemPlaylist.map((menu) => (
              <NavMenuItem menu={menu} key={menu.label} />
            ))}
          </List>
          <Divider borderColor="gray.700" />
          <Box overflowY="auto">
            <List spacing={2}>
              {playlists.map((playlist) => (
                <NavMenuItem
                  menu={{ label: playlist.playlistName, link: '', icon: '' }}
                  key={playlist.playlistName}
                />
              ))}
            </List>
          </Box>
        </Box>
      </Box>
    </GridItem>
  );
};

export default Sidebar;
