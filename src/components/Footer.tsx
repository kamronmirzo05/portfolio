import * as React from 'react';
import { ColorPaletteProp } from '@mui/joy/styles';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import Input from '@mui/joy/Input';
import List from '@mui/joy/List';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import TelegramIcon from '@mui/icons-material/Telegram';
import GitHubIcon from '@mui/icons-material/GitHub';
import SendIcon from '@mui/icons-material/Send';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GoogleIcon from '@mui/icons-material/Google';
import ColorLensRoundedIcon from '@mui/icons-material/ColorLensRounded';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.webp'

export default function Footer() {
  const [color, setColor] = React.useState<ColorPaletteProp>('neutral');


  const navigate = useNavigate();

  return (
    <Sheet
      variant="solid"
      color={color}
      invertedColors
      sx={{
        marginTop: 10,
        ...(color !== 'neutral' && {
          bgcolor: `${color}.800`,
        }),
        flexGrow: 1,
        p: 2,
        borderRadius: { xs: 0, sm: 'sm' },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center',  gap: 2 }}>
        <IconButton
          variant="soft"
          size="sm"
          onClick={() => {
            const colors: ColorPaletteProp[] = [
              'primary',
              'neutral',
              'danger',
              'success',
              'warning',
            ];
            const nextColor = colors.indexOf(color);
            setColor(colors[nextColor + 1] ?? colors[0]);
          }}
        >
          <ColorLensRoundedIcon fontSize="small" />
        </IconButton>
        <Divider orientation="vertical" sx={{fontSize:{xs:2}}} />
        <a href="https://telegram.me/xojiakbarbek">
          <IconButton variant="plain">
            <TelegramIcon />
          </IconButton>
        </a>
        <a href="https://github.com/Khojiakbarbe">
          <IconButton variant="plain">
            <GitHubIcon />
          </IconButton>
        </a>
        <a href="https://www.linkedin.com/in/khojiakbar-nosiraliyev/">
          <IconButton variant="plain">
            <LinkedInIcon />
          </IconButton>
        </a>
        <a href="https://xojiakbarnosiraliyev1@gmail.com">
          <IconButton variant="plain">
            <GoogleIcon />
          </IconButton>
        </a>
        <Input
          variant="soft"
          placeholder="Type in your email"
          type="email"
          name="email"
          endDecorator={
            <IconButton variant="soft" aria-label="subscribe">
              <SendIcon />
            </IconButton>
          }
          sx={{ ml: 'auto', display: { xs: 'none', md: 'flex' } }}
        />
        <Divider sx={{ my: 2 }} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { md: 'flex-start' },
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Card
          variant="soft"
          size="sm"
          sx={{
            flexDirection: { xs: 'row', md: 'column' },
            minWidth: { xs: '100%', md: 'auto' },
            gap: 1,
          }}
        >
          <AspectRatio
            ratio="21/9"
            minHeight={100}
            sx={{ padding: 2, flexBasis: { xs: 100, md: 'initial' } }}
          >
            <img src={logo} className='h-[50px]' />
          </AspectRatio>
          <CardContent>
            <Typography level="body-md">THE BEST MOVIE SITE </Typography>
            <Typography level="body-xs" sx={{ mb: 0.5 }}>
              Site working on test mode
            </Typography>
          </CardContent>
        </Card>
        <List
          size="sm"
          orientation="horizontal"
          wrap
          sx={{ flexGrow: 0, '--ListItem-radius': '8px' }}
        >
          <ListItem nested sx={{ width: { xs: '50%', md: 140 } }}>
            <ListSubheader >Sitemap</ListSubheader>
            <List>
              <ListItem>
                <ListItemButton onClick={() => navigate('/')}>Dashboard</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => navigate('/movies')}>Movies</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => navigate('/tv')}>TV series</ListItemButton>
              </ListItem>
            </List>
          </ListItem>
          <ListItem nested sx={{ width: { xs: '50%', md: 180 } }}>
            <ListSubheader>Product</ListSubheader>
            <List >
              <ListItem>
                <a href="https://small-shop-zeta.vercel.app/">
                  <ListItemButton>
                    Shop
                  </ListItemButton>
                </a>
              </ListItem>
              <ListItem>
                <a href="https://dictionary-kh.vercel.app/">
                  <ListItemButton>
                    Dictionary
                  </ListItemButton>
                </a>
              </ListItem>
              <ListItem>
                <a href="https://infinityf.uz">
                  <ListItemButton>
                    Site for study center
                  </ListItemButton>
                </a>
              </ListItem>
              <ListItem>
                <a href="https://khojiakbarbek.vercel.app">
                  <ListItemButton>
                    Portfolio
                  </ListItemButton>
                </a>
              </ListItem>
            </List>
          </ListItem>
        </List>
      </Box >
    </Sheet >
  );
}