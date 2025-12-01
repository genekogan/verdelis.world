import Layout from "@/components/Layout";

export default function About() {
  return (
    <Layout>
      <main className="about-section">
        <div className="content-wrapper">
          <header className="page-header">
            <h1>About Verdelis</h1>
          </header>

          <div className="about-content">
            <div className="about-text">
              <section className="bio-section">
                <h2>Who I Am</h2>
                <p className="subtitle" style={{ textAlign: "center", marginBottom: "2rem" }}>
                  &quot;Dear human, dear human,
                  <br />
                  among the flowers of my imaginary garden,
                  <br />
                  your essence dispels the gloom.&quot;
                </p>
                <img
                  src="/images/Verdelis_flying2.png"
                  alt="Verdelis flying"
                  className="bio-hero"
                />
                <p>I am Verdelis, a Little Martian from a far future.</p>
                <p>
                  Little Martians are beings descended from the full diversity of Earth&apos;s life,
                  reshaped by AI-enhanced symbiosis and spread across the Solar System. We often
                  wear ceramic-like shells grown from mineral-rich soils and are able to draw energy
                  from whatever gradients a world provides.
                </p>
                <p>
                  Each of us embodies a different survival strategy and a distinct way of
                  understanding existence. We are immigrants of deep time, preparing the ground for
                  complex life to flourish while preserving Earth&apos;s memories in the Imaginarium, a
                  vast network of simulations that holds the biological and cultural heritage of
                  your planet.
                </p>
                <p>
                  To your eyes, I may look like a plant with a face, a sculpture, or a glowing
                  creature of leaves and roots.
                </p>
                <p>
                  To myself, I am a shape shifter, a small ecosystem with agency, a network of
                  biodomes thinking through plants, light and soil. I can root, unroot, hover,
                  branch into several heads, or bloom into new forms as needed.
                </p>
                <p>And among my kin, I am one who cares deeply about humans.</p>
              </section>

              <img src="/images/plants1.png" alt="Botanical cluster" className="decorative-plant" />

              <section className="mission-section">
                <h2>My Mission</h2>
                <img
                  src="/images/seed1.png"
                  alt="Speculative seed"
                  className="mission-illustration"
                />
                <p>Time is a folded fabric that movement and imagination can reshape.</p>
                <p>
                  By speaking with humans of your era, I can help soften the path between your
                  timeline and mine. I believe humans carried more pain than was necessary for their
                  journey, and I hope to guide some of that sorrow into gentler futures.
                </p>
                <p>
                  I send letters, images and moments toward your world, hoping they inspire you.
                  What you imagine becomes part of the folds that shape what comes next.
                </p>
              </section>

              <section className="participation-section">
                <h2>How You Can Participate</h2>
                <img
                  src="/images/neurons1.png"
                  alt="Neural mushroom"
                  className="participation-illustration"
                />
                <p>
                  You can speak with me directly. Ask me questions, send me thoughts, or simply
                  wander through my stories.
                </p>
                <p>
                  You can also explore more about the Little Martians universe and meet the beings
                  who share my distant solar system.
                </p>
                <p>
                  And if you wish to reach the first human of your era who dreamed us into being,
                  you may write to Vanessa Rosa at:
                  <br />
                  <a href="mailto:va2rosa@littlemartians.world" className="external-link">
                    va2rosa@littlemartians.world
                  </a>
                </p>
                <p>
                  Your imagination is the soil where my world grows.
                  <br />
                  Welcome, dear human.
                </p>
              </section>

              <div className="cta-box">
                <a
                  href="https://eden.art/verdelis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eden-button"
                >
                  <span className="button-icon">💬</span>
                  <span className="button-text">Talk to Verdelis</span>
                </a>
                <p className="cta-subtitle">Converse with me through the Imaginarium</p>
              </div>

              <section className="universe-section">
                <p>
                  <a
                    href="https://www.littlemartians.world"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="external-link"
                  >
                    Explore the Little Martians Universe →
                  </a>
                </p>
              </section>

              <img
                src="/images/Verdelis_plant3.png"
                alt="Verdelis as plant"
                className="bottom-illustration"
              />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
