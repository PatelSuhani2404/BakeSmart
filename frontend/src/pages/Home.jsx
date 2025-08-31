import './Home.css';
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import LiveSearch from '../components/LiveSearch';
import { useState } from 'react';

function Home(){

  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us, " + form.name + "!");
    setForm({ name: "", email: "", message: "" });
  };

    return(
        <>
        <Navbar />
        <div className="hero">
            <img src="images/background3.jpg" alt="Fresh bakery banner" className="hero-img"/>
            <div className="hero-text">
                <h1> Welcome to BakeSmart </h1>
                <p> Freshly Baked. Lovingly Made </p>
                <a href="/cakes" className="btn btn-success"> Shop Now </a>
            </div>
        </div>

        <LiveSearch/>

        
        <section className='categories px-6'>
            <h2 className='text-center'> Explore Categories </h2>
            <div id="bakeCarousel" className='carousel slide mb-5' data-bs-ride='carousel'>
                <div className='carousel-inner'>
                    <div className='carousel-item active'>
                        <img src='/images/cake.jpg' className='i mx-auto d-block' alt='Delicious Cakes'/>
                        <div className="carousel-caption">
                            <Link to="/cakes" className='btn btn-outline-dark'> Cakes </Link>
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <img src='/images/cheesecakes.jpg' className='i mx-auto d-block' alt='Delicious Chessecake'/>
                        <div className="carousel-caption">
                            <Link to="/cheesecake" className='btn btn-outline-dark'> Cheesecake </Link>
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <img src='/images/cupcake.jpg' className='i mx-auto d-block' alt='Delicious Cupcakes'/>
                        <div className="carousel-caption">
                            <Link to="/cupcakes" className='btn btn-outline-dark'> Cupcakes </Link>
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <img src='/images/pastry.jpg' className='i mx-auto d-block' alt='Delicious Pastries'/>
                        <div className="carousel-caption">
                            <Link to="/pastries" className='btn btn-outline-dark'> Pastries </Link>
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <img src='/images/cookies.jpg' className='i mx-auto d-block' alt='Delicious Other Items'/>
                        <div className="carousel-caption">
                            <Link to="/other" className='btn btn-outline-dark'> Other Items </Link>
                        </div>
                    </div>
                    <button className='carousel-control-prev' type='button' data-bs-target='#bakeCarousel' data-bs-slide='prev'>
                        <span className='carousel-control-prev-icon'></span>
                    </button>
                    <button className='carousel-control-next' type='button' data-bs-target='#bakeCarousel' data-bs-slide='next'>
                        <span className='carousel-control-next-icon'></span>
                    </button>
                </div>
            </div>
        </section>

        <section className='about text-center my-4 px-4'>
            <h2> About Us </h2>
            <p>
                <b> BakeSmart </b> is your go-to bakery for fresh, handmate cakes, pastries,
                cheesecakes and more. We bake with love and passion every day.
            </p>
            <p>
                Our mission is simple - to make your special moments sweeter with freshly baked goods that taste as good as they look.
                    Whether it's a birthday, a celebration, or just a treat for yourself, BakeSmart has something for everyone.
            </p>
            <p>
                <b> BakeSmart </b> isn't just a bakery - it's a place where happiness is baked daily.
            </p>
        </section>

        
        <section className="contact-section">
            <h2>Contact Us</h2>
            <p>We'd love to hear from you! Fill out the form below:</p>

            <form className="contact-form" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
            <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} required ></textarea>
            <button type="submit">Send Message</button>
            </form>
        </section>
        </>
    )
}

export default Home