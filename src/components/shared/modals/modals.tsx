import { closeModal } from 'src/redux/actions/actions';
import { connect } from 'react-redux';
import { ModalCloseButton } from 'src/components/base/modal/modal.buttons';
import {
    ModalBlur,
    MModalBodyContainer,
    ModalTitleBar,
    ModalTitle,
    ModalBlurWrapper
} from './styled.modals';

function Modals({ modals, closeModal }) {
    return modals.map((modal, index) => (
        <ModalComponent key={index} closeModal={closeModal} {...modal} />
    ));
}

function ModalComponent({
    Body,
    Container = MModalBodyContainer,
    title,
    id,
    topBar,
    closeButton,
    closeModal,
    top = 80,
    canClose = true,
    searchData = '',
    hasSearch = false,
    sideBarSearch = false,
    ...rest
}) {
    return (
        <ModalBlurWrapper id="modal-blur-wrapper" onClick={handleClickoOutside}>
            <ModalBlur
                sideBarSearch={sideBarSearch}
                topValue={top}
                hasSearch={hasSearch}
                topBar={topBar}
                id="modal-blur-component"
                onClick={handleClickoOutside}>
                <Container>
                    {(title || closeButton) && (
                        <ModalTitleBar>
                            <ModalTitle>{title ?? ''}</ModalTitle>
                            {closeButton && <ModalCloseButton handleCloseModal={handleClose} />}
                        </ModalTitleBar>
                    )}
                    <Body id={id} searchData={searchData} closeModal={handleClose} {...rest} />
                </Container>
            </ModalBlur>
        </ModalBlurWrapper>
    );

    function handleClose() {
        closeModal(id);
    }

    function handleClickoOutside(e) {
        if (['modal-blur-wrapper', 'modal-blur-component'].includes(e.target.id) && canClose)
            handleClose();
    }
}

const mapStateToProps = ({ modals }) => ({ modals });

const mapDispatchToProps = { closeModal };

export default connect(mapStateToProps, mapDispatchToProps)(Modals);
