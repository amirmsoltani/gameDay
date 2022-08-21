import * as S from './lib/styles'
import Navbar from './lib/components/navbar'
import BaseLayout from '../base.layout';


export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <BaseLayout>
      <S.Layout>
        <Navbar />
        <S.MainSection>
          {children}
        </S.MainSection>
      </S.Layout>
    </BaseLayout>
  )
}

export default AdminLayout
