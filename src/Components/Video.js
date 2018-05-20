import styled from 'styled-components'
import { Component } from 'preact'
import { Col } from 'react-styled-flexboxgrid'
import Flex from 'styled-flex-component'
import { Link } from 'preact-router/match'
import YouTube from 'react-youtube'

const Button = styled.button`
  background: transparent;
  display: block;
  border: none;
  color: #f61c0d;
  font-weight: bold;
  text-align: right;
  padding: 0;
`

const Video = styled.section`
  position: relative;
`

const Speaker = styled.p`
  a {
    opacity: 0.6;
    font-family: Montserrat-Light;
    font-size: 12px;
    color: #000000;
    letter-spacing: 0.09px;
    text-align: left;
    line-height: 21px;
    padding-left: 20px;
    text-decoration: none;
  }
`

const Name = styled.h2`
  font-family: Montserrat;
  font-size: 400;
  font-size: 22px;
  color: #000000;
  letter-spacing: -0.63px;
`

const Description = styled.p`
  opacity: 0.6;
  font-family: Montserrat-Light;
  font-size: 14px;
  color: #000000;
  letter-spacing: 0.11px;
  line-height: 21px;
`

const Column = styled(Col)`
  transition: all 200ms ease;
  margin-bottom: 20px;
`
const Iframe = styled(YouTube)`
  position: relative;
  z-index: 3;
  border: none;
  transition: all 200ms ease;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.12);
`

const makeLink = name => `/speaker/${name.replace(/\s+/g, '-').toLowerCase()}`

export default class extends Component {
  state = { isDescriptionClicked: false }

  toggleDescription = () =>
    this.setState(({ isDescriptionClicked }) => ({
      isDescriptionClicked: !isDescriptionClicked
    }))

  render = ({ speaker, description, link, name }, { isDescriptionClicked }) => (
    <Column
      md={isDescriptionClicked ? 12 : 4}
      xs={isDescriptionClicked ? 12 : 6}
    >
      <Video>
        <Iframe
          videoId={link}
          opts={{
            width: '100%',
            height: isDescriptionClicked ? '500' : 180
          }}
        />
      </Video>

      <Flex justifyBetween alignCenter>
        <Name>{name}</Name>
        <Speaker>
          <Link activeClassName="active" href={makeLink(speaker.name)}>
            {speaker.name}
          </Link>
        </Speaker>
      </Flex>
      <Button onClick={this.toggleDescription}>
        {isDescriptionClicked ? 'Hide' : 'Show'} Description
      </Button>

      {isDescriptionClicked ? <Description>{description}</Description> : null}
    </Column>
  )
}