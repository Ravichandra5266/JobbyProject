import "./index.css";

const Skills = (props) => {
  const { each } = props;
  return (
    <li className="skill-con">
      <div className="skill-container">
        <img src={each.imageUrl} alt={each.name} className="skill-img" />
        <h1 className="skill-name">{each.name}</h1>
      </div>
    </li>
  );
};

export default Skills;
