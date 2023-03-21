import FormHeader from './formHeader';
import FormFooter from "./formFooter";
import Form from './form';

export default function WholeForm(){
    return(
        <>
            <section className="wholeForm">
                <FormHeader />
                <Form />
            </section>
            <FormFooter />
        </>
    )
}