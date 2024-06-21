import '../../Design-assets/Logo.png'
import TextArea from './Components/textArea'
import Navbar from './Components/Navbar'
function App() {
  return (
    <>
      <section id="main-panel" className=" flex flex-col gap-3 px-12 size-full h-svh w-full border-2 border-green-400">
        {/* <header className='w-full h-16 flex items-center text-xl font-fugaz text-gray-800 '> Campaign Buddy </header> */}
        <Navbar></Navbar>
        <div className='w-full h-fit min-h-[300px]  flex items-center justify-center'>
            <TextArea/>
        </div>
      </section>

    </>
  )
}

export default App
