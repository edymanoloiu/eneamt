import Breadcrumb from "../components/common/Breadcrumb";
import BreadcrumbBanner from "../components/common/BreadcrumbBanner";
import HeadMeta from "../components/elements/HeadMeta";
import FooterOne from "../components/footer/FooterOne";
import HeaderOne from "../components/header/HeaderOne";

const ContactPage = () => {

	return (
		<>
			<HeadMeta metaTitle="Politica de Cookies" metaDesc={"Politica de Cookies pentru site-ul eneamt.ro"} />
			<HeaderOne />
			<Breadcrumb aPage="Politica de Cookies" />
			<BreadcrumbBanner pageTitle="Politica de Cookies" />
			<div className="container">
				<div className="row">
					<div className="col-lg-8">
						<div className="axil-content">
							<h1>Politica de Cookies</h1>

							<h2>1. Ce sunt cookie-urile?</h2>
							<p>
								Cookie-urile sunt fișiere text mici stocate pe dispozitivul dvs. de către site-urile pe care le vizitați. Ele ajută site-ul să funcționeze corect, să rețină preferințele și să analizeze modul de utilizare.
							</p>

							<h2>2. Ce cookie-uri folosim?</h2>
							<ul>
								<li><strong>Cookie-uri necesare</strong> – pentru funcționarea tehnică a site-ului;</li>
								<li><strong>Cookie-uri statistice</strong> – pentru analiza traficului (Google Analytics);</li>
								<li><strong>Cookie-uri de marketing</strong> – pentru afișarea de reclame relevante (Google AdSense, Meta Pixel).</li>
							</ul>

							<h2>3. Consimțământ</h2>
							<p>
								La prima vizită pe site-ul <strong>eneamt.ro</strong>, vi se va afișa o fereastră/bara de informare privind cookie-urile. Puteți accepta toate cookie-urile sau vă puteți personaliza preferințele.
							</p>

							<h2>4. Cum puteți controla cookie-urile</h2>
							<p>
								Puteți șterge sau bloca cookie-urile din setările browserului. Rețineți că dezactivarea cookie-urilor poate afecta funcționarea corectă a site-ului.
							</p>

							<h2>5. Actualizări</h2>
							<p>
								Această politică poate fi actualizată periodic pentru a respecta modificările legislative sau tehnice. Vă recomandăm să verificați regulat această pagină.
							</p>
						</div>
					</div>
				</div>
			</div>
			<FooterOne />
		</>
	);
}

export default ContactPage;





