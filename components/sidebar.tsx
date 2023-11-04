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
} from '@chakra-ui/layout';
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from 'react-icons/md';

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

const playlists = [...Array(50)].map((_, i) => ({
  label: `Playlist ${i}`,
  link: '/',
}));

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
  return (
    <Box
      width="100%"
      height="calc(100vh - 100px)"
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
              <NavMenuItem menu={playlist} key={playlist.label} />
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
