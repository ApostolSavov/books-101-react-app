import './About.scss';


const About = () => {

    return (
        <div className="about-page">
            📚 📚 📚
            Books 101 is a softuni react project, which allows users to write, edit and delete book reviews.
            <hr className='divider' />
            The static book catalog can be filtered to easily find the book you want to add a review for, but keep in mind this requires authentication.
            <hr className='divider' />
            Users can interact with each others' reviews by voting.
            📚 📚 📚
        </div>
    );
};

export default About;