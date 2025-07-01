
import './Nav.css'
import SideMenu from '../SideMenu/SideMenu'

export default function Nav({ options, isBurgerOpen, setIsBurgerOpen }) {
    return (<nav>
        <div class="landscape-only flex-content">
            { options.map(({ href, name }) => (
                <a href={href}>{name}</a>
            ))}
        </div>
        <div class="portrait-only">
            <slot></slot>
            <SideMenu isOpen={isBurgerOpen} setIsOpen={setIsBurgerOpen}>
                <div class="portrait-side-menu-content">
                    { options.map(({ href, name }) => (
                        <a href={href}>{name}</a>
                    ))}
                </div>
            </SideMenu>
        </div>
    </nav>)
}