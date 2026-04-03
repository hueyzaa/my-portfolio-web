import{r as g,u as x,A as y,B as F,n as c,F as n,k as f,m as u,j,D as b,l as P,q as e,z as k}from"./index-xzXqjlR0.js";import{B as p}from"./BaseForm-NDlh-jFb.js";import{F as q,B as v,g as B,e as S,a as w,c as h}from"./AuthForm.styles-DtxxPGaP.js";import{q as T}from"./base-DTzaVxil.js";import{A as $}from"./AuthLayout.styles-CkJ8MYsd.js";import"./BaseInput-BRbNKRBL.js";import"./InputPassword-D8aez3-V.js";import"./BaseCheckbox-rtSFYWxB.js";import"./index-C-et-jLo.js";const E=()=>g.useMemo(()=>{const a=window.location.href,r=T.parseUrl(a);return{token:r.query.token||null,email:r.query.email||null}},[]),I=(s,a)=>{const r=x(),[i,t]=g.useState(!1);return{handleSubmit:async m=>{try{t(!0);const o=await y.post(`${F.RESET}`,{email:s,token_reset_pass:a,mat_khau_moi:m.password});o.code===200?(c.success({message:"Tạo thành công mật khẩu mới"}),r("/auth/login")):c.error({message:o.message})}catch(o){c.error({message:"Có lỗi xảy ra vui lòng thử lại sau",description:o.message}),console.error("New password error:",o)}finally{t(!1)}},isLoading:i}},_=j.div`
  margin-bottom: 1.875rem;
  color: var(--text-main-color);
  font-size: ${n.xs};
  font-weight: ${f.regular};

  @media only screen and ${u.xs} {
    font-size: ${n.xxs};
  }

  @media only screen and ${u.md} {
    font-size: ${n.xs};
  }
`,N=j(b)`
  font-size: ${n.md};
  font-weight: ${f.semibold};
  width: 100%;
  margin-top: 1.125rem;
  margin-bottom: 1rem;
`,z=()=>{const{t:s}=P(),a=x(),{token:r,email:i}=E(),{handleSubmit:t,isLoading:l}=I(i,r);return e.jsx(q,{children:e.jsxs(p,{layout:"vertical",onFinish:t,children:[e.jsxs(v,{onClick:()=>a(-1),children:[e.jsx(B,{rev:""}),s("common.back")]}),e.jsx(S,{children:s("newPassword.title")}),e.jsx(_,{style:{textAlign:"center"},children:s("newPassword.description")}),e.jsx(w,{name:"password",label:s("common.password"),rules:[{required:!0,message:s("common.requiredField")}],children:e.jsx(h,{placeholder:s("common.password")})}),e.jsx(w,{name:"confirmPassword",label:s("common.confirmPassword"),dependencies:["password"],rules:[{required:!0,message:s("common.requiredField")},({getFieldValue:m})=>({validator(o,d){return!d||m("password")===d?Promise.resolve():Promise.reject(new Error(s("common.confirmPasswordError")))}})],hasFeedback:!0,children:e.jsx(h,{placeholder:s("common.confirmPassword")})}),e.jsx(p.Item,{noStyle:!0,children:e.jsx(N,{type:"primary",htmlType:"submit",loading:l,children:s("common.update")})})]})})},H=()=>{const{t:s}=P();return e.jsxs(e.Fragment,{children:[e.jsx(k,{children:s("common.newPassword")}),e.jsx($,{children:e.jsx(z,{})})]})};export{H as NewPasswordPage,H as default};
