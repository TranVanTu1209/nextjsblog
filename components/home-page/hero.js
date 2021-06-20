import Image from "next/image";

import classes from "./hero.module.css";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/tu.jpg"
          alt="An image showing Tu"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I'm Tu</h1>
      <p>
        I blog about web development - especially frontend frameworks like
        Express or React.
      </p>
    </section>
  );
}

export default Hero;
