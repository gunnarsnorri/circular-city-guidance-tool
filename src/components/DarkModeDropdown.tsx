import { NavDropdown } from 'react-bootstrap';



const arrayOfThemes = [
    { name: 'Light', icon: '☀️' },
    { name: 'Dark', icon: '🌙' },
    { name: 'Auto', icon: '⚙️' },
    // { name: 'Blue', icon: '🟦' }, //Add your own themes!
];

//Modifies the html root element
export default function DarkModeDropdown({ mode, setPreferredTheme }: { mode: string, setPreferredTheme: Function }) {

    return (
        <NavDropdown align={'end'}
            title={
                <>
                    {
                        arrayOfThemes.find((theme) => theme.name.toLowerCase() === mode)
                            ?.icon
                    }{' '}
                </>
            }
        >
            {arrayOfThemes.map((theme) => {
                const active = mode === theme.name.toLowerCase();
                return (
                    <NavDropdown.Item
                        key={theme.name}
                        className={active ? 'active' : ''}
                        onClick={() => {
                            setPreferredTheme(theme.name.toLocaleLowerCase());
                        }}
                    >
                        {' '}
                        {theme.icon} {theme.name} {active ? '✔️' : ''}
                    </NavDropdown.Item>
                );
            })}
        </NavDropdown>
    );
}
