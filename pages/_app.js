import './styles.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <div style={{ background: "red", color: "white", padding: 10 }}>
        TEST APP UPDATED
      </div>
      <Component {...pageProps} />
    </>
  )
}
