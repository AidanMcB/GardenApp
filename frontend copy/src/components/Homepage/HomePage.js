import PropTypes from 'prop-types'
import React, { Component } from 'react'
import veggieVillage from '../images/veggieVillage.png'
import veggieGarden from '../images/veggieGarden.jpg'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'

//does this need to be a single functional component?
//or can it stay multiple class components?
const getWidth = () => {
    const isSSR = typeof window === 'undefined'
  
    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
  }
  
  /* eslint-disable react/no-multi-comp */
  /* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
   * such things.
   */
  const HomepageHeading = ({ mobile }) => (
    <Container text>
      <Header
        as='h1'
        
        content='Backyard Garden'
        inverted
        style={{
          fontSize: mobile ? '3em' : '5em',
          fontWeight: 'bold',
          marginBottom: 0,
          marginTop: mobile ? '1.5em' : '0em',
          color:"green",
          textShadow:"3px 3px 0 #000"
          // textShadow:"-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"
        }}
      />
      <Header
        as='h2'
        content='Get the most out of your garden'
        inverted
        style={{
          fontSize: mobile ? '1.5em' : '1.7em',
          fontWeight: 'bold',
          color:"black",
          marginTop: mobile ? '0.5em' : '.7em',
        }}
      />
      {/* consider paler green */}
      <Button 
      style={{borderStyle:"solid", marginTop: '21.5em', textShadow:"2px 2px 0 #000"}}
      color='huge brown'>
        <a style={{color:"white", textShadow:"1.5px 1.5px 0 #000"}} href="/signUp" >Sign Up for an Account</a>
        <Icon name='right arrow' />
      </Button>
    </Container>
  )
  
  HomepageHeading.propTypes = {
    mobile: PropTypes.bool,
  }
  
  /* Heads up!
   * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
   * It can be more complicated, but you can create really flexible markup.
   */
  class DesktopContainer extends Component {
    state = {}
   
    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })
  
    render() {
      const { children } = this.props
      const { fixed } = this.state
  
      return (
        <Responsive style={{marginTop:"-15px"}} getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
          <Visibility
            once={false}
            onBottomPassed={this.showFixedMenu}
            onBottomPassedReverse={this.hideFixedMenu}
          >
            <Segment
              inverted
              textAlign='center'
              style={{ backgroundImage:`url(${veggieVillage})`,
              backgroundSize: 'cover',
               minHeight: 700,
                padding: '1em 0em' }}
              vertical
            >
              {/* <Menu
                fixed={fixed ? 'top' : null}
                inverted={!fixed}
                pointing={!fixed}
                secondary={!fixed}
                size='large'
              >
                
              </Menu> */}
              <HomepageHeading />
            </Segment>
          </Visibility>
  
          {children}
        </Responsive>
      )
    }
  }
  
  DesktopContainer.propTypes = {
    children: PropTypes.node,
  }
  
  class MobileContainer extends Component {
    state = {}
  
    handleSidebarHide = () => this.setState({ sidebarOpened: false })
  
    handleToggle = () => this.setState({ sidebarOpened: true })
  
    render() {
      const { children } = this.props
      const { sidebarOpened } = this.state
  
      return (
        <Responsive
          as={Sidebar.Pushable}
          getWidth={getWidth}
          maxWidth={Responsive.onlyMobile.maxWidth}
        >
  
          
        </Responsive>
      )
    }
  }
  
  MobileContainer.propTypes = {
    children: PropTypes.node,
  }
  
  const ResponsiveContainer = ({ children }) => (
    <div>
      <DesktopContainer>{children}</DesktopContainer>
      <MobileContainer>{children}</MobileContainer>
    </div>
  )
  
  ResponsiveContainer.propTypes = {
    children: PropTypes.node,
  }
  
  export default function HomePage() {
      return(
    <ResponsiveContainer >
      <Segment style={{ padding: '8em 0em', backgroundColor:"lightgreen" }} vertical>
        <Grid container stackable verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                Keep track of your Garden with live weather updates!
              </Header>
              <p style={{ fontSize: '1.33em' }}>
              After signing in and providing your city, check your weather tabs to see your local weather.
              Know when to bust out the frost cloth, water a little extra, or put up some wind barricades for your garden!
              </p>
              <Header as='h3' style={{ fontSize: '2em' }}>
                Gardener's MessageBoard
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                Head over to the message board to see the latest posts from gardener's around the world! See pictures from their garden and find out how their crops are doing. If you like what you see, you can even head over to their garden and see what they have planted.
              </p>
            </Grid.Column>
            <Grid.Column floated='right' width={6}>
              <Image bordered rounded size='big' src={veggieGarden} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Button 
              
              color='brown' size='huge'><a style={{color:"white"}} href="message_board">Message Board</a></Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
  
      <Segment style={{ padding: '0em', backgroundColor:'tan' }} vertical>
        <Grid celled='internally' columns='equal' stackable>
          <Grid.Row textAlign='center'>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                Find your crop
              </Header>
              <p style={{ fontSize: '1.33em' }}>
              Search an extensive databse of crops to find the one you want to plant</p>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                Local Weather
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                {/* <Image avatar src='/images/avatar/large/nan.jpg' /> */}
                See your city's temperature, wind speed, humidity and more to predict how to care for your garden
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
  
      <Segment style={{ padding: '8em 0em', backgroundColor:"lightgreen" }} vertical>
        <Container text>
          <Header as='h3' style={{ fontSize: '2em' }}>
            About Me
          </Header>
          <p style={{ fontSize: '1.33em' }}>
           I am a Software Engineer recently graduated from Flatiron Academy in Houston, Texas. 
           I have a background in gardening, farming, and agriculture in general as I worked at my town's local farm market since I was 15 years old.
           From planting asparagus, to picking blackberries, to propagating succuelnts, I got a lot of experience in the garden world there. 
           This project was a chance for me to showcase my Software Engineering skills as well as my knowledge of gardening at the same time.
          </p>
          {/* <Button as='a' size='large brown'>
            Read More
          </Button>
   */}
          <Divider
            as='h4'
            className='header'
            horizontal
            style={{ margin: '3em 0em', textTransform: 'uppercase' }}
          >
            <p>Technical Info</p>
          </Divider>
  
          <Header as='h3' style={{ fontSize: '2em' }}>
            Technologies Used to Build This Application
          </Header>
          <p style={{ fontSize: '1.33em' }}>
           I used a Ruby on Rails for the backend of this project. I used the Rails app as an API to store my data. 
           Authentication exists on the back end and the front end.
           For the front end I used React-Redux. React-Redux allows for an easier manipulation and tracking of the state in the app with reducers.
           To style the application I mostly used Semantic-UI-React along with some CSS where necessary to achieve certain effects.
          </p>
          {/* <Button as='a' size='large brown'>
            I'm Still Quite Interested
          </Button> */}
        </Container>
      </Segment>
  
      <Segment inverted vertical style={{ padding: '5em 0em'}}>
        <Container>
          <Grid divided inverted stackable>
            <Grid.Row>
              <Grid.Column width={3}>
                <Header inverted as='h4' content='About' />
                <List link inverted>
                  <List.Item as='a'>Sitemap</List.Item>
                  <List.Item as='a'>Contact Us</List.Item>
                  <List.Item as='a'>Religious Ceremonies</List.Item>
                  <List.Item as='a'>Gazebo Plans</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as='h4' content='Services' />
                <List link inverted>
                  <List.Item as='a'>Banana Pre-Order</List.Item>
                  <List.Item as='a'>DNA FAQ</List.Item>
                  <List.Item as='a'>How To Access</List.Item>
                  <List.Item as='a'>Favorite X-Men</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={7}>
                <Header as='h4' inverted>
                  Footer Header
                </Header>
                <p>
                  Extra space for a call to action inside the footer that could help re-engage users.
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    </ResponsiveContainer>
  )
} 