import { useFormik } from 'formik';
import * as Yup from 'yup'


const Form = () => {

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            amount: '',
            currency: '',
            text: '',
            terms: false
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(2, 'Минимум 2 символа')
                .required('Обязательное поле'),
            email: Yup.string()
                .email('Неккоректный адрес почты')
                .required('Обязательное поле'),
            amount: Yup.number()
                .required('Сумма обязательна')
                .min(5, 'Не менее 5'),
            currency: Yup.string().required('Выберите валюту'),
            text: Yup.string()
                .min(10, 'Не менее 10 символов'),
            terms: Yup.boolean()
                .required('Необходимо согласие')
                .oneOf([true], "Необходимо согласие")
        }),
        onSubmit: values => console.log(JSON.stringify(values, null, 2))
    })

    return (
        <form className="form" onSubmit={formik.handleSubmit}>
            <h2>Донат</h2>
            <label htmlFor="name">Ваше имя</label>
            <input
                id="name"
                name="name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name ? <div>{formik.errors.name}</div> : null }
            <label htmlFor="email">Ваша почта</label>
            <input
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email ? <div>{formik.errors.email}</div> : null }
            <label htmlFor="amount">Сумма</label>
            <input
                id="amount"
                name="amount"
                type="number"
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <label htmlFor="currency">Валюта</label>
            <select
                id="currency"
                name="currency"
                value={formik.values.currency}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                >
                    <option value="">Выберите валюту</option>
                    <option value="USD">USD</option>
                    <option value="UAH">UAH</option>
                    <option value="RUB">RUB</option>
            </select>
            <label htmlFor="text">Ваше сообщение</label>
            <textarea
                id="text"
                name="text"
                value={formik.values.text}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <label className="checkbox">
                <input
                    name="terms"
                    type="checkbox"
                    value={formik.values.terms}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                Соглашаетесь с политикой конфиденциальности?
            </label>
            <button type="submit">Отправить</button>
        </form>
    )
}

export default Form;