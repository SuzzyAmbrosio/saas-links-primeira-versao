import ProgramasAfiliados from "@/components/ProgramasAfiliados"
import FAQLanding from "@/components/FAQLanding"
import CTAFinal from "@/components/CTAFinal"
import Footer from "@/components/Footer"

export default function LandingPage() {
  return (
    <>
      {/* Aqui você pode colocar Hero, Features, etc */}
      
      <ProgramasAfiliados />
      
      {/* Seção Escolha Seu Plano vai aqui - te passo se quiser */}
      
      <FAQLanding />
      
      <CTAFinal />
      
      <Footer />
    </>
  )
}