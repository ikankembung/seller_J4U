import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import smkn4Logo from "./assets/smkn4.png";
import eyeIcon from "./assets/eye.png";
import showIcon from "./assets/show.png";
import Loading from "./loadingpage"; 
import bcrypt from 'bcryptjs';

// Tambahkan interface untuk Seller
interface Seller {
  contact_info: string;
  password: string;
  seller_id: string;
  token: string;
  // Tambahkan properti lain yang ada dalam objek seller
}

const App: React.FC = () => {
  const [contact_info, setContactInfo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
  
    try {
      const response = await axios.get("https://d006-114-10-45-252.ngrok-free.app/data_sellers", {
        params: {
          contact_info
        }
      });
  
      console.log("Contact Info:", contact_info);
      console.log("Response Data:", response.data);
  
      if (response.data && response.data.length > 0) {
        const seller = response.data.find((s: Seller) => s.contact_info === contact_info);
        
        if (seller) {
          const isMatch = await bcrypt.compare(password, seller.password); // Bandingkan password
  
          if (isMatch) {
            localStorage.setItem("seller", JSON.stringify(seller));
            localStorage.setItem("seller_id", seller.seller_id);
            localStorage.setItem("token", seller.token);
            navigate("/homepage");
          } else {
            setErrorMessage("Login gagal. Periksa Contact Info & password.");
          }
        } else {
          setErrorMessage("Login gagal. Periksa Contact Info & password.");
        }
      } else {
        setErrorMessage("Login gagal. Periksa Contact Info & password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Terjadi kesalahan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div style={styles.container}>
      {loading && <Loading />} {}
      {!loading && (
        <>
          <nav style={styles.navbar}>
            <h1 style={styles.navTitle}>LOGIN</h1>
          </nav>
          <div style={styles.cardContainer}>
            <img src={smkn4Logo} alt="SMKN 4 Logo" style={styles.logo} />
            <div style={styles.card}>
              <h2 style={styles.title}>LOGIN</h2>
              <form style={styles.form} onSubmit={handleLogin}>
                <div style={styles.inputGroup}>
                  <input
                    type="text"
                    placeholder="Contact Info"
                    style={styles.input}
                    value={contact_info}
                    onChange={(e) => setContactInfo(e.target.value)}
                    required
                  />
                </div>
                <div style={styles.inputGroup}>
                  <div style={styles.passwordWrapper}>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      style={styles.input}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <img
                      src={showPassword ? showIcon : eyeIcon}
                      alt="Toggle Password"
                      style={styles.eyeIcon}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </div>
                </div>
                {errorMessage && <p style={styles.errorText}>{errorMessage}</p>}
                <button type="submit" style={styles.button}>LOGIN</button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: { backgroundColor: "#ffffff", minHeight: "100vh" },
  navbar: { backgroundColor: "transparent", padding: "1rem" },
  navTitle: { margin: 0, fontSize: "1.5rem", color: "#000", fontWeight: "bold" },
  cardContainer: { display: "flex", flexDirection: "column", alignItems: "center", marginTop: "2rem" },
  logo: { width: "180px", height: "180px", marginBottom: "1rem" },
  card: {
    backgroundColor: "#ffffff",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19)",
    width: "100%",
    maxWidth: "400px",
    margin: "2rem auto",
  },
  title: { marginBottom: "1.5rem", color: "#000", textAlign: "center", fontSize: "2rem", fontWeight: "bold" },
  form: { display: "flex", flexDirection: "column" },
  inputGroup: { marginBottom: "1rem" },
  input: { width: "100%", padding: "0.75rem", border: "1px solid #ccc", borderRadius: "25px", fontSize: "1rem" },
  passwordWrapper: { position: "relative", width: "100%" },
  eyeIcon: { position: "absolute", right: "20px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", width: "24px", height: "24px" },
  button: { padding: "0.75rem", backgroundColor: "#0A66A0", color: "#fff", border: "none", borderRadius: "25px", fontSize: "1rem", cursor: "pointer" },
  errorText: { color: "red", textAlign: "center", marginTop: "1rem" },
};

export default App;
