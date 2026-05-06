@Service // spring이 관리하는 Service 객체
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    // @Autowired private UserMapper userMapper;
    // @Autowired private PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Users select(String username) throws Exception {
        Users user = userMapper.select(username);
        return user;
    }

    @Override
    @Transactional
    public int join(Users user) throws Exception {
        String username = user.getUsername();
        String password = user.getPassword();
        // 123456 -> 🔒 F123N905123890N3138932N4 (암호화)
        String encodedPassword = passwordEncoder.encode(password);  // 🔒 비밀번호 암호화
        user.setPassword(encodedPassword);

        // 회원 등록
        int result = userMapper.join(user);

        if( result > 0 ) {
          // 회원 기본 권한 등록
          UserAuth userAuth = new UserAuth();
          userAuth.setUsername(username);
          userAuth.setAuth("ROLE_USER");
          result = userMapper.insertAuth(userAuth);
        }
        return result;
    }

    @Override
    public int update(Users user) throws Exception {
        // 비밀번호 변경하는 경우 암호화 처리
        String password = user.getPassword();
        if( password != null && !password.isEmpty() ) {
          String encodedPassword = passwordEncoder.encode(password);  // 🔒 비밀번호 암호화
          user.setPassword(encodedPassword);
        }
        int result = userMapper.update(user);
        return result;
    }

    @Override
    public int insertAuth(UserAuth userAuth) throws Exception {
        int result = userMapper.insertAuth(userAuth);
        return result;
    }
    
}
