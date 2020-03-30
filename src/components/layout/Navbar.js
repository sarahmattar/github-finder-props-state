import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ icon, title }) => {
	return (
		<nav className='navbar bg-primary'>
			<h1>
				<FontAwesomeIcon icon={icon} /> {title}
			</h1>
			<ul>
				<li>
					<Link to='/'>Home</Link>
				</li>
				<li>
					<Link to='/about'>About</Link>
				</li>
			</ul>
		</nav>
	);
};

Navbar.defaultProps = {
	title: 'GitHub Finder',
	icon: faGithub,
};

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.object.isRequired,
};

export default Navbar;
