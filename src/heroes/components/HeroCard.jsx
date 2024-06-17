import {Link} from 'react-router-dom';

import './style.css';


export const HeroCard = ({
    id, 
    superhero, 
    publisher, 
    alter_ego, 
    first_appearance, 
    characters
}) => {

    const heroImageUrl = `/heroes/${id}.jpg`;

    return (
        <div className="col animate__animated animate__fadeIn ">
            <div className="card border-0">

                <div className="row no-gutters heroCard ">
                    <div className="col-4 ">
                        <img src={heroImageUrl} className="card-img" alt={superhero} />
                    </div>

                    <div className="col-8">
                        <div className="card-body">
                            <h5 className="card-title">{superhero}</h5>
                            <p className="card-text">{alter_ego}</p>

                            {
                                (alter_ego !== characters) && (<p>{characters}</p>)
                            }

                            <p className="card-text">
                                <smal className="text-muted">{first_appearance}</smal>
                            </p>

                            <Link to={`/hero/${id}`}>
                                Mas...
                            </Link>

                            
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
